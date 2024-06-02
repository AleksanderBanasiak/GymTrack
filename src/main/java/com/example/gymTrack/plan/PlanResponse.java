package com.example.gymTrack.plan;


import com.example.gymTrack.exercises.ExerciseType;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlanResponse {


    private Long id;
    private String name;

    private int exercises;

    private int sets;

    private Set<ExerciseType> muscleGroups;

}
