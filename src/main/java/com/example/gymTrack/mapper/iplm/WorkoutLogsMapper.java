package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.dto.request.WorkoutLogsRequest;
import com.example.gymTrack.domain.dto.response.WorkoutLogsResponse;
import com.example.gymTrack.domain.entity.PlanExercise;
import com.example.gymTrack.domain.entity.WorkoutLogs;
import com.example.gymTrack.domain.entity.WorkoutSession;
import com.example.gymTrack.mapper.Mapper;
import com.example.gymTrack.repository.PlanExerciseRepo;
import com.example.gymTrack.repository.WorkoutSessionRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkoutLogsMapper implements Mapper<WorkoutLogs, WorkoutLogsResponse, WorkoutLogsRequest> {

    private final WorkoutSessionRepo workoutSessionRepo;
    private final PlanExerciseRepo planExerciseRepo;
    private final ModelMapper modelMapper;


    @Override
    public WorkoutLogs toEntity(WorkoutLogsRequest request) {
        return WorkoutLogs.builder()
                .setNumber(request.getSetNumber())
                .weight(request.getWeight())
                .reps(request.getReps())
                .summaryWeight(request.getWeight() * request.getReps())
                .workoutSession(workoutSessionRepo.findById(request.getWorkoutSessionId()).orElseThrow(() -> new IllegalArgumentException(
                        "Workout session not found"
                )))
                .planExercise(planExerciseRepo.findById(request.getPlanExerciseId()).orElseThrow(() -> new IllegalArgumentException(
                                "Exercise not found"
                )))
                .build();
    }

    @Override
    public WorkoutLogsResponse toResponse(WorkoutLogs workoutLogs) {

        return WorkoutLogsResponse.builder()
                .sessionId(workoutLogs.getWorkoutSession().getId())
                .setNumber(workoutLogs.getSetNumber())
                .weight(workoutLogs.getWeight())
                .reps(workoutLogs.getReps())
                .summaryWeight(workoutLogs.getSummaryWeight())
                .exerciseId(workoutLogs.getPlanExercise().getId())
                .sessionDate(workoutLogs.getWorkoutSession().getSessionDate())
                .build();
    }
}
