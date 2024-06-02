package com.example.gymTrack.planExercise;


import com.example.gymTrack.plan.Plan;
import com.example.gymTrack.plan.PlanRepo;
import com.example.gymTrack.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanExerciseService {

    private final PlanExerciseRepo planExerciseRepo;
    private final PlanExerciseMapper planExerciseMapper;
    private final PlanRepo planRepo;

    public Long save(PlanExerciseRequest request, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        PlanExercise planExercise = planExerciseMapper.mapPlanExerciseRequestToPlanExercise(request);
        planExercise.setUser(user);
        return planExerciseRepo.save(planExercise).getId();
    }

    public List<PlanExerciseResponse> getAllPlanExerciseWithoutPlan(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return planExerciseRepo.findAllWherePlanIdIsNull(user.getId()).stream()
                .map(planExerciseMapper::mapPlanExerciseToPlanExerciseResponse)
                .toList();
    }

    public void deletePlanExercise(Long id) {
        planExerciseRepo.deleteById(id);
    }

    public void setWorkoutPlan(List<PlanExerciseResponse> allPlanExerciseWithoutPlan) {
        Plan lastWorkout = planRepo.findLastId();

        List<Long> planExercisesIds = allPlanExerciseWithoutPlan.stream()
                .map(PlanExerciseResponse::getId)
                .toList();

        List<PlanExercise> planExercises = planExerciseRepo.findAllById(planExercisesIds);

        planExercises.forEach(planExercise -> planExercise.setWorkoutPlan(lastWorkout));

        planExerciseRepo.saveAll(planExercises);

    }

    public Long saveForWorkout(PlanExerciseRequest request, Long workoutId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        PlanExercise planExercise = planExerciseMapper.mapPlanExerciseRequestToPlanExercise(request);
        planExercise.setUser(user);
        planExercise.setWorkoutPlan(planRepo.findById(workoutId).orElseThrow(() -> new EntityNotFoundException("Workout not found")));
        return planExerciseRepo.save(planExercise).getId();
    }
}
