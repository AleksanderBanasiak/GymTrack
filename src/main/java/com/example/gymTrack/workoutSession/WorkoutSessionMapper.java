package com.example.gymTrack.workoutSession;

import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionMapper {
    public WorkoutSessionResponse mapWorkoutSessionToWorkoutSessionResponse(WorkoutSession lastUnsavedWorkoutSession) {
        return WorkoutSessionResponse.builder()
                .id(lastUnsavedWorkoutSession.getId())
                .sessionDate(lastUnsavedWorkoutSession.getSessionDate())
                .planName(lastUnsavedWorkoutSession.getWorkoutPlan().getName())
                .build();
    }
}
