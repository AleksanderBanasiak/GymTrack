package com.example.gymTrack.workoutSession;

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

    @GetMapping("/unsaved")
    public ResponseEntity<WorkoutSessionResponse> findLastUnsavedWorkoutSessionByUserId(Authentication authUser){
        return ResponseEntity.ok(workoutSessionService.findLastUnsavedWorkoutSessionByUserId(authUser));
    }

    @DeleteMapping("/{id}")
    public void deleteWorkoutSession(@PathVariable Long id) {
        workoutSessionService.deleteWorkoutSession(id);
    }

}
