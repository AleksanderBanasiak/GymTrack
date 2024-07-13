package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.request.WorkoutLogsRequest;
import com.example.gymTrack.domain.dto.response.WorkoutLogsResponse;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.domain.entity.WorkoutLogs;
import com.example.gymTrack.domain.entity.WorkoutSession;
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

    public List<WorkoutLogsResponse> findAllLogsBySessionId(Long id) {
        WorkoutSession workoutSession = workoutSessionRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Session not found"));


        return workoutLogsRepo.findAllWorkoutLogsBySessionId(id).stream()
                .map(workoutLogsMapper::toResponse)
                .toList();
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
}