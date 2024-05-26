package com.example.gymTrack.exercises;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ExerciseRequest(

        @NotEmpty(message = "Name is mandatory")
        @NotBlank(message = "Name is mandatory")
        @NotNull(message = "Name is mandatory")
        String name,

        @NotNull(message = "Name is mandatory")
        ExerciseType type



) {
}
