package com.example.gymTrack.domain.dto.response;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SummaryResponse {

    private Integer reps;
    private Double weight;
    private Integer sessions;
    private Integer sets;

}
