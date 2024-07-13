package com.example.gymTrack.controller;


import com.example.gymTrack.domain.dto.request.PlanExerciseRequest;
import com.example.gymTrack.domain.dto.response.PlanExerciseResponse;
import com.example.gymTrack.service.PlanExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("plan-exercise")
public class PlanExerciseController {

    private final PlanExerciseService planExerciseService;

    // save PlanExercise without workout
    @PostMapping
    public ResponseEntity<Long> savePlanExercise(@RequestBody @Valid PlanExerciseRequest request, Authentication authUser){
        return ResponseEntity.ok(planExerciseService.save(request, authUser));
    }

    @PostMapping("/workout/{id}")
    public ResponseEntity<Long> savePlanExerciseForSpecificWorkout(@RequestBody @Valid PlanExerciseRequest request,@PathVariable("id") Long workoutId, Authentication authUser){
        return ResponseEntity.ok(planExerciseService.saveForWorkout(request,workoutId, authUser));
    }

    @GetMapping("/unsaved")
    public ResponseEntity<List<PlanExerciseResponse>> getAllPlanExerciseWithoutPlan(Authentication authUser){
        return  ResponseEntity.ok(planExerciseService.getAllPlanExerciseWithoutPlan(authUser));
    }

    @DeleteMapping("/{id}")
    public void deletePlanExercise(@PathVariable Long id) {
        planExerciseService.deletePlanExercise(id);
    }



}
