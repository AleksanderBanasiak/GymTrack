package com.example.gymTrack.domain.dto.response;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteExerciseResponse {

    private Long id;
    private Long exerciseId;

}
