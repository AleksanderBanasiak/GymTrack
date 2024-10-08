package com.example.gymTrack.controller;

import com.example.gymTrack.domain.dto.response.WorkoutSessionResponse;
import com.example.gymTrack.service.WorkoutSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<WorkoutSessionResponse>> findAllSessions(Authentication authUser){
        return ResponseEntity.ok(workoutSessionService.findAllSessions(authUser));
    }

    @GetMapping("/last")
    public ResponseEntity< WorkoutSessionResponse> findLastSession(Authentication authUser){
        WorkoutSessionResponse response = workoutSessionService.findLastSession(authUser);

        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/{month-id}/{year-id}")
    public ResponseEntity<List<WorkoutSessionResponse>> findAllSessionsByMonth(@PathVariable("month-id") Long monthId, @PathVariable("year-id") Long yearId, Authentication authUser){
        return ResponseEntity.ok(workoutSessionService.findAllSessionsByMonth(monthId, yearId, authUser));
    }

}
