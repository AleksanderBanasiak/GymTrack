package com.example.gymTrack.plan;


import com.example.gymTrack.planExercise.PlanExerciseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("plan")
public class PlanController {

    private final PlanService planService;


    @PostMapping
    public ResponseEntity<Long> save(@RequestBody @Valid PlanRequest planRequest, Authentication authUser){
        return ResponseEntity.ok(planService.save(planRequest, authUser));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlanResponse>> findAllUserPlans(Authentication authUser){
        return ResponseEntity.ok(planService.findAllUserPlans(authUser));
    }

    @GetMapping("/{plan_id}/exercises")
    public ResponseEntity<List<PlanExerciseResponse>> findAllExercisesByTrainingId(@PathVariable("plan_id") Long id){
        return ResponseEntity.ok(planService.findAllExercisesByTrainingId(id));
    }

    @GetMapping("/{plan_id}")
    public ResponseEntity<PlanResponse> findPlanById(@PathVariable("plan_id") Long id){
        return ResponseEntity.ok(planService.findPlanById(id));
    }



}
