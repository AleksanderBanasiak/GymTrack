package com.example.gymTrack.domain.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotesRequest {


    @NotEmpty(message = "Note is mandatory")
    @NotBlank(message = "Note is mandatory")
    @NotNull(message = "Note is mandatory")
    @Size(max = 255, message = "Note must be at most 255 characters")
    private String note;

    @NotNull(message = "ExerciseId is mandatory")
    private Long exerciseId;
}
