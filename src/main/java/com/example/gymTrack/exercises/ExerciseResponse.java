package com.example.gymTrack.exercises;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseResponse {

    private Long id;
    private String name;
    private ExerciseType type;

}
