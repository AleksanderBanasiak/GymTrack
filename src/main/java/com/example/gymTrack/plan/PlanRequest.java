package com.example.gymTrack.plan;

import com.example.gymTrack.exercises.ExerciseType;
import com.example.gymTrack.planExercise.PlanExerciseRequest;
import com.example.gymTrack.planExercise.PlanExerciseResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PlanRequest(


        @NotEmpty(message = "Name is mandatory")
        @NotBlank(message = "Name is mandatory")
        @NotNull(message = "Name is mandatory")
        String name,

        @NotNull(message = "PlanExercises cannot be null")
        List<PlanExerciseResponse> planExerciseResponses


) {
}
