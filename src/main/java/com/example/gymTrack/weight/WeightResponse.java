package com.example.gymTrack.weight;


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
