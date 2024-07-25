package com.example.gymTrack.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteExerciseRequest {


    @NotNull(message = "Exercise is mandatory")
    private Long exerciseId;


}
