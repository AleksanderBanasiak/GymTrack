package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.request.NotesRequest;
import com.example.gymTrack.domain.dto.response.NotesResponse;
import com.example.gymTrack.domain.entity.Exercise;
import com.example.gymTrack.domain.entity.Notes;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.mapper.iplm.NotesMapper;
import com.example.gymTrack.repository.ExerciseRepo;
import com.example.gymTrack.repository.NotesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotesService {

    private final NotesRepo notesRepo;
    private final NotesMapper notesMapper;

    public Long saveNotes(NotesRequest request, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Notes notes = notesMapper.toEntity(request);
        notes.setUser(user);
        return notesRepo.save(notes).getId();
    }

    public List<NotesResponse> findAllNotes(Authentication authUser) {
        User user = (User) authUser.getPrincipal();


        return notesRepo.findByUserId(user.getId()).stream()
                .map(notesMapper::toResponse)
                .toList();
    }

    public void deleteNote(Long id) {
        notesRepo.deleteById(id);
    }
}
