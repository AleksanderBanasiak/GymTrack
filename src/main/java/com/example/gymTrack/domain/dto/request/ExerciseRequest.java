package com.example.gymTrack.domain.dto.request;

import com.example.gymTrack.domain.entity.ExerciseType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ExerciseRequest {

    @NotEmpty(message = "Name is mandatory")
    @NotBlank(message = "Name is mandatory")
    @NotNull(message = "Name is mandatory")
    private String name;

    @NotNull(message = "Type is mandatory")
    private ExerciseType exerciseType;

}
