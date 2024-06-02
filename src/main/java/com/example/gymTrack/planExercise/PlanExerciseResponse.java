package com.example.gymTrack.planExercise;


import com.example.gymTrack.exercises.ExerciseType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlanExerciseResponse {


    private Long id;
    private String exerciseName;
    private ExerciseType type;
    private Integer sets;
}
