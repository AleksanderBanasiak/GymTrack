package com.example.gymTrack.domain.dto.response;

import com.example.gymTrack.domain.entity.ExerciseType;
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
