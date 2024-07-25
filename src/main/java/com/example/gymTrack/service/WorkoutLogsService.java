package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.request.WorkoutLogsRequest;
import com.example.gymTrack.domain.dto.response.SummaryResponse;
import com.example.gymTrack.domain.dto.response.WorkoutLogsResponse;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.domain.entity.WorkoutLogs;
import com.example.gymTrack.mapper.iplm.WorkoutLogsMapper;
import com.example.gymTrack.repository.WorkoutLogsRepo;
import com.example.gymTrack.repository.WorkoutSessionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutLogsService {

    private final WorkoutLogsRepo workoutLogsRepo;
    private final WorkoutSessionRepo workoutSessionRepo;
    private final WorkoutLogsMapper workoutLogsMapper;

    public Long save(WorkoutLogsRequest request) {

        return workoutLogsRepo.save(workoutLogsMapper.toEntity(request)).getId();
    }

    public List<List<WorkoutLogsResponse>> findAllLogsBySessionId(Long id) {

        List<WorkoutLogsResponse> workoutLogs = workoutLogsRepo.findAllWorkoutLogsBySessionId(id).stream()
                .map(workoutLogsMapper::toResponse)
                .toList();

        Map<Long, List<WorkoutLogsResponse>> groupedByExerciseId = workoutLogs.stream()
                .collect(Collectors.groupingBy(WorkoutLogsResponse::getExerciseId));

        return groupedByExerciseId.values().stream()
                .map(list -> list.stream()
                        .sorted(Comparator.comparingInt(WorkoutLogsResponse::getSetNumber))
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());
    }

    public List<WorkoutLogsResponse> findAllLogsByExerciseIdAndUserId(Long id, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        return workoutLogsRepo.findAllLogsByExerciseIdAndUserId(id, user.getId()).stream()
                .map(workoutLogsMapper::toResponse)
                .sorted(Comparator.comparing(WorkoutLogsResponse::getSessionId)
                        .thenComparing(WorkoutLogsResponse::getSessionDate)
                        .thenComparing(WorkoutLogsResponse::getSetNumber))
                .collect(Collectors.toList());
    }

    public List<WorkoutLogsResponse> findAllLogsMaxByExerciseIdAndUserId(Long id, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        return workoutLogsRepo.findLogsByExerciseMaxIdAndUserId(id, user.getId()).stream()
                .collect(Collectors.groupingBy(log -> log.getWorkoutSession().getId()))
                .values().stream()
                .map(group -> group.get(0))
                .map(workoutLogsMapper::toResponse)
                .toList();
    }

    public List<List<WorkoutLogsResponse>> findAllLogsByExerciseIdAndUserIdGroupedBySessionId(Long exerciseId, Long sessionId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        List<WorkoutLogs> list = workoutLogsRepo.findAllLogsByExerciseIdAndUserIdOrderBySetNumberAsc(exerciseId, user.getId(), sessionId).stream()
                .toList();

        Map<Long, List<WorkoutLogsResponse>> groupedBySessionId = list.stream()
                .map(workoutLogsMapper::toResponse)
                .collect(Collectors.groupingBy(WorkoutLogsResponse::getSessionId));

        return groupedBySessionId.values().stream()
                .map(log -> log.stream()
                        .sorted(Comparator.comparing(WorkoutLogsResponse::getSetNumber))
                        .collect(Collectors.toList()))
                .sorted(Comparator.comparing((List<WorkoutLogsResponse> log) -> log.get(0).getSessionDate()).reversed())
                .collect(Collectors.toList());
    }

    public List<WorkoutLogsResponse> findAllLogsBySessionIdAndPlanExerciseId(Long planExerciseId, Long sessionId) {
        return workoutLogsRepo.findAllLogsBySessionIdAndExerciseId(planExerciseId, sessionId).stream()
                .map(workoutLogsMapper::toResponse)
                .toList();
    }

    public List<WorkoutLogsResponse> findAllRecordByExerciseId(Long id, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        if(!workoutLogsRepo.findByExerciseId(id, user.getId())) {
            return new ArrayList<>();
        }

        WorkoutLogsResponse oneRepMax = workoutLogsMapper.toResponse(workoutLogsRepo.findLogsByExerciseOneRepMax(id, user.getId()));

        WorkoutLogsResponse bestSet = workoutLogsMapper.toResponse(workoutLogsRepo.findLogsByExerciseBestSet(id, user.getId()));


        List<WorkoutLogsResponse> bestSets = workoutLogsRepo.findLogsByExerciseBestSets(id, user.getId()).stream()
                .map(workoutLogsMapper::toResponse)
                .toList();

        double totalSummaryWeight = bestSets.stream()
                .mapToDouble(log -> log.getSummaryWeight() != null ? log.getSummaryWeight() : 0.0)
                .sum();


        WorkoutLogsResponse combinedLog = WorkoutLogsResponse.builder()
                .setNumber(bestSet.getSetNumber())
                .weight(bestSet.getWeight())
                .reps(bestSet.getReps())
                .exerciseId(bestSet.getExerciseId())
                .sessionId(bestSet.getSessionId())
                .sessionDate(bestSet.getSessionDate())
                .summaryWeight(totalSummaryWeight)
                .build();



        List<WorkoutLogsResponse> result = new ArrayList<>();
        result.add(oneRepMax);
        result.add(bestSet);
        result.add(combinedLog);

        return result;
    }

    public SummaryResponse findSummaryLogs(Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        List<WorkoutLogs> logs = workoutLogsRepo.findAllLogsByUserId(user.getId());


        return SummaryResponse.builder()
                .sessions(workoutSessionRepo.findCountSessionByUserId(user.getId()))
                .sets(logs.size())
                .reps(logs.stream()
                        .mapToInt(WorkoutLogs::getReps)
                        .sum())
                .weight(logs.stream()
                        .mapToDouble(WorkoutLogs::getSummaryWeight)
                        .sum())
                .build();
    }
}
