package com.example.gymTrack.domain.dto.response;


import com.example.gymTrack.domain.entity.ExerciseType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlanExerciseResponse {


    private Long id;
    private String exerciseName;

    private Long exerciseId;
    private ExerciseType type;
    private Integer sets;
}
