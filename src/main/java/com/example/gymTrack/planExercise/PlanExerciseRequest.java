package com.example.gymTrack.planExercise;

import com.example.gymTrack.exercises.Exercise;
import com.example.gymTrack.exercises.ExerciseRequest;
import com.example.gymTrack.exercises.ExerciseResponse;
import jakarta.validation.constraints.*;

public record PlanExerciseRequest(

        @Min(value = 1, message = "Sets value must be greater than 0")
        @Max(value = 10, message = "Sets value must be less than 10")
        Integer sets,

        @NotNull(message = "Exercise is mandatory")
        ExerciseResponse exercise

) {
}
