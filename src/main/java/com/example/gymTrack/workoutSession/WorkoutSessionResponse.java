package com.example.gymTrack.workoutSession;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionResponse {


    private Long id;
    private String planName;
    private LocalDate sessionDate;

}
