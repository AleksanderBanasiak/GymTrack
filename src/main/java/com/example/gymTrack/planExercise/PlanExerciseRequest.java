package com.example.gymTrack.planExercise;

import com.example.gymTrack.exercises.Exercise;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PlanExerciseRequest(

        @NotEmpty(message = "Sets are mandatory")
        @NotBlank(message = "Sets are mandatory")
        @NotNull(message = "Sets are mandatory")
        Integer sets,

        @NotNull(message = "Exercise is mandatory")
        Exercise exercise

) {
}
