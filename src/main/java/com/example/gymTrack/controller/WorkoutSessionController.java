package com.example.gymTrack.controller;

import com.example.gymTrack.domain.dto.response.WorkoutSessionResponse;
import com.example.gymTrack.service.WorkoutSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("workout-session")
public class WorkoutSessionController {


    private final WorkoutSessionService workoutSessionService;

    @PostMapping
    public ResponseEntity<Long> saveWorkoutSession(@RequestBody Long planId, Authentication authUser){
        return ResponseEntity.ok(workoutSessionService.save(planId, authUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutSessionResponse> findSessionById(@PathVariable Long id){
        return ResponseEntity.ok(workoutSessionService.findById(id ));
    }

    @GetMapping("/unsaved")
    public ResponseEntity<WorkoutSessionResponse> findLastUnsavedWorkoutSessionByUserId(Authentication authUser){
        return ResponseEntity.ok(workoutSessionService.findLastUnsavedWorkoutSessionByUserId(authUser));
    }

    @DeleteMapping("/{id}")
    public void deleteWorkoutSession(@PathVariable Long id) {
        workoutSessionService.deleteWorkoutSession(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Long> endSession(@PathVariable Long id){
        return ResponseEntity.ok(workoutSessionService.endSession(id));
    }

}
