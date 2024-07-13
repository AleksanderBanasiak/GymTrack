package com.example.gymTrack.domain.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkoutLogsRequest {

    @NotNull(message = "Number of set are mandatory")
    @Positive
    @DecimalMax(value = "11", message = "Number of set cannot exceed 11")
    private Integer setNumber;

    @NotNull(message = "Weight is mandatory")
    @Positive
    @DecimalMax(value = "700", message = "Weight cannot exceed 700")
    private Double weight;

    @NotNull(message = "Reps are mandatory")
    @Positive
    @DecimalMax(value = "150", message = "Reps cannot exceed 150")
    private Integer reps;

    @NotNull(message = "Workout session is mandatory")
    private Long workoutSessionId;

    @NotNull(message = "Exercise is mandatory")
    private Long planExerciseId;


}
