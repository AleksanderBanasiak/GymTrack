package com.example.gymTrack.planExercise;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlanExerciseController {


    private final PlanExerciseService planExerciseService;


    @PostMapping
    public ResponseEntity<Long> savePlanExercise(@RequestBody @Valid PlanExerciseRequest request, Authentication authUser){
        return ResponseEntity.ok(planExerciseService.save(request, authUser));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlanExerciseResponse>> getAllPlanExerciseWithoutPlan(Authentication authUser){
        return  ResponseEntity.ok(planExerciseService.getAllPlanExerciseWithoutPlan(authUser));
    }
}
