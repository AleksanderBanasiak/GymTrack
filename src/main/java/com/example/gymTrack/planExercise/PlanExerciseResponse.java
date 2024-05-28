package com.example.gymTrack.planExercise;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlanExerciseResponse {


    private Long id;
    private String exerciseName;
    private Integer sets;
}
