package com.example.gymTrack.domain.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlanExerciseRequest{

        @Min(value = 1, message = "Sets value must be greater than 0")
        @Max(value = 10, message = "Sets value must be less than 10")
        private Integer sets;

        @NotNull(message = "Exercise is mandatory")
        private Long exerciseId;
}
