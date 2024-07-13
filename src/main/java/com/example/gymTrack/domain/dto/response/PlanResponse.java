package com.example.gymTrack.domain.dto.response;


import com.example.gymTrack.domain.entity.ExerciseType;
import lombok.*;

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
