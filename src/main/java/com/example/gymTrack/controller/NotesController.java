package com.example.gymTrack.controller;

import com.example.gymTrack.domain.dto.request.NotesRequest;
import com.example.gymTrack.domain.dto.response.NotesResponse;
import com.example.gymTrack.service.NotesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("notes")
public class NotesController {

    private final NotesService notesService;


    @PostMapping
    public ResponseEntity<Long> saveNotes(@RequestBody @Valid NotesRequest request, Authentication authUser){
        return ResponseEntity.ok(notesService.saveNotes(request, authUser));
    }

    @GetMapping
    public ResponseEntity<List<NotesResponse>> findAllNotes(Authentication authUser){
        return ResponseEntity.ok(notesService.findAllNotes(authUser));
    }
    @GetMapping("/{id}")
    public ResponseEntity<List<NotesResponse>> findAllNotesForExercise(@PathVariable Long id,Authentication authUser){
        return ResponseEntity.ok(notesService.findAllNotesForExercise(id, authUser));
    }

    @DeleteMapping("/{id}")
    public void deleteNotes(@PathVariable Long id) {
        notesService.deleteNote(id);
    }

}
