package com.example.gymTrack.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlanRequest{


        @NotEmpty(message = "Name is mandatory")
        @NotBlank(message = "Name is mandatory")
        @NotNull(message = "Name is mandatory")
        private String name;

        @NotNull(message = "PlanExercises cannot be null")
        private List<Long> planExerciseIds;


}
