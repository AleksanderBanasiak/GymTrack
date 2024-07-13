package com.example.gymTrack.domain.dto.response;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeightResponse {


    private Long id;
    private Double weight;
    private LocalDate date;
}
