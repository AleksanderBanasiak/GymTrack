package com.example.gymTrack.domain.dto.response;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionResponse {


    private Long id;
    private Long planId;
    private String planName;
    private LocalDate sessionDate;

}
