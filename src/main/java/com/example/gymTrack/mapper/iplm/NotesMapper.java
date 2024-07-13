package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.dto.request.NotesRequest;
import com.example.gymTrack.domain.dto.response.NotesResponse;
import com.example.gymTrack.domain.entity.Exercise;
import com.example.gymTrack.domain.entity.Notes;
import com.example.gymTrack.mapper.Mapper;
import com.example.gymTrack.repository.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class NotesMapper implements Mapper<Notes, NotesResponse, NotesRequest> {

    private final ModelMapper mapper;
    private final ExerciseRepo exerciseRepo;

    @Override
    public Notes toEntity(NotesRequest notesRequest) {
        Exercise exercise = exerciseRepo.findById(notesRequest.getExerciseId()).orElseThrow(() -> new IllegalArgumentException("Exercise not found"));

        return Notes.builder()
                .note(notesRequest.getNote())
                .date(LocalDate.now())
                .exercise(exercise)
                .build();
    }

    @Override
    public NotesResponse toResponse(Notes notes) {
        return mapper.map(notes, NotesResponse.class);
    }
}
