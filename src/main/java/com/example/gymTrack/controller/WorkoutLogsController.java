package com.example.gymTrack.controller;


import com.example.gymTrack.domain.dto.request.WorkoutLogsRequest;
import com.example.gymTrack.domain.dto.response.SummaryResponse;
import com.example.gymTrack.domain.dto.response.WorkoutLogsResponse;
import com.example.gymTrack.domain.entity.WorkoutLogs;
import com.example.gymTrack.service.WorkoutLogsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("workout-logs")
@RequiredArgsConstructor
public class WorkoutLogsController {

    private final WorkoutLogsService workoutLogsService;


    @PostMapping
    public ResponseEntity<Long> save(@RequestBody @Valid WorkoutLogsRequest request){
        return ResponseEntity.ok(workoutLogsService.save(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<List<WorkoutLogsResponse>>> findAllLogsBySessionId(@PathVariable Long id){
        return ResponseEntity.ok(workoutLogsService.findAllLogsBySessionId(id));
    }

    @GetMapping("/plan-exercise/{plan-exercise-id}/session/{session-id}")
    public ResponseEntity<List<WorkoutLogsResponse>> findAllLogsBySessionIdAndPlanExerciseId(@PathVariable("plan-exercise-id") Long planExerciseId, @PathVariable("session-id") Long sessionId){
        return ResponseEntity.ok(workoutLogsService.findAllLogsBySessionIdAndPlanExerciseId(planExerciseId, sessionId));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<List<WorkoutLogsResponse>> findAllRecordByExerciseId(@PathVariable Long id, Authentication authUser){
        return ResponseEntity.ok(workoutLogsService.findAllRecordByExerciseId(id, authUser));
    }

    @GetMapping("/exercise/{id}")
    public ResponseEntity<List<WorkoutLogsResponse>> findAllLogsByExerciseIdAndUserId(@PathVariable Long id, Authentication authUser){
        return ResponseEntity.ok(workoutLogsService.findAllLogsByExerciseIdAndUserId(id, authUser));
    }

    @GetMapping("/exercise/max/{id}")
    public ResponseEntity<List<WorkoutLogsResponse>> findAllLogsMaxByExerciseIdAndUserId(@PathVariable Long id, Authentication authUser){
        return ResponseEntity.ok(workoutLogsService.findAllLogsMaxByExerciseIdAndUserId(id, authUser));
    }

    @GetMapping("/exercise/{exercise-id}/session/{session-id}")
    public ResponseEntity<List<List<WorkoutLogsResponse>>> findAllLogsByExerciseIdAndUserIdGroupedBySessionId(@PathVariable("exercise-id") Long exerciseId, @PathVariable("session-id") Long sessionId, Authentication authUser){
        return ResponseEntity.ok(workoutLogsService.findAllLogsByExerciseIdAndUserIdGroupedBySessionId(exerciseId, sessionId, authUser));
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryResponse> findSummaryLogs(Authentication authUser){
        return ResponseEntity.ok(workoutLogsService.findSummaryLogs(authUser));
    }

    @GetMapping("/last/{id}")
    public ResponseEntity<List<WorkoutLogsResponse>> findLastLogsByExerciseIdAndUserId(@PathVariable Long id, Authentication authUser){
        return ResponseEntity.ok(workoutLogsService.findLastLogsByExerciseIdAndUserId(id, authUser));
    }



}
