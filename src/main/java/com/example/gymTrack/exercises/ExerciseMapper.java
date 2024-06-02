package com.example.gymTrack.exercises;

import org.springframework.stereotype.Service;

@Service
public class ExerciseMapper {
    public Exercise mapExerciseRequestToExercise(ExerciseRequest request) {

        return Exercise.builder()
                .name(request.name())
                .exerciseType(request.type())
                .build();

    }

    public ExerciseResponse mapExerciseToExerciseResponse(Exercise exercise) {
        return ExerciseResponse.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .type(exercise.getExerciseType())
                .build();
    }

    public Exercise mapExerciseResponseToExercise(ExerciseResponse exercise) {
        return Exercise.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .exerciseType(exercise.getType())
                .build();
    }
}
