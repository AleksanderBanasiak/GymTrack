package com.example.gymTrack.domain.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutLogsResponse {

    private Integer setNumber;
    private Double weight;
    private Integer reps;
    private Double summaryWeight;
    private Long exerciseId;
    private Long sessionId;
    private LocalDate sessionDate;
}
