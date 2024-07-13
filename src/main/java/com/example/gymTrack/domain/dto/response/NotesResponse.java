package com.example.gymTrack.domain.dto.response;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotesResponse {

    private Long id;
    private String note;
    private LocalDate date;

}
