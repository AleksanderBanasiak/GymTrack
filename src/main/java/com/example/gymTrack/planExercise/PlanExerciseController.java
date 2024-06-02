package com.example.gymTrack.planExercise;


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


    @PostMapping
    public ResponseEntity<Long> savePlanExercise(@RequestBody @Valid PlanExerciseRequest request, Authentication authUser){
        return ResponseEntity.ok(planExerciseService.save(request, authUser));
    }

    @GetMapping("/unsaved")
    public ResponseEntity<List<PlanExerciseResponse>> getAllPlanExerciseWithoutPlan(Authentication authUser){
        return  ResponseEntity.ok(planExerciseService.getAllPlanExerciseWithoutPlan(authUser));
    }

    @DeleteMapping("/{id}")
    public void deletePlanExercise(@PathVariable Long id, Authentication authUser) {
        planExerciseService.deletePlanExercise(id);
    }

    @PatchMapping("set-plan")
    public void setWorkoutPlan(Authentication authUser){
        planExerciseService.setWorkoutPlan(planExerciseService.getAllPlanExerciseWithoutPlan(authUser));
    }

}
