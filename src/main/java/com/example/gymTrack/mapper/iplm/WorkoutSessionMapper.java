package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.entity.WorkoutSession;
import com.example.gymTrack.domain.dto.response.WorkoutSessionResponse;
import com.example.gymTrack.mapper.Mapper;
import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionMapper implements Mapper<WorkoutSession, WorkoutSessionResponse, Void> {


    @Override
    public WorkoutSession toEntity(Void unused) {
        return null;
    }

    @Override
    public WorkoutSessionResponse toResponse(WorkoutSession workoutSession) {
        return WorkoutSessionResponse.builder()
                .id(workoutSession.getId())
                .sessionDate(workoutSession.getSessionDate())
                .planId(workoutSession.getWorkoutPlan().getId())
                .planName(workoutSession.getWorkoutPlan().getName())
                .build();
    }
}
