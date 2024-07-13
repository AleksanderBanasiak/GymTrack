package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.request.PlanRequest;
import com.example.gymTrack.domain.dto.response.PlanResponse;
import com.example.gymTrack.domain.entity.Plan;
import com.example.gymTrack.mapper.iplm.PlanMapper;
import com.example.gymTrack.domain.entity.PlanExercise;
import com.example.gymTrack.mapper.iplm.PlanExerciseMapper;
import com.example.gymTrack.repository.PlanExerciseRepo;
import com.example.gymTrack.domain.dto.response.PlanExerciseResponse;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.repository.PlanRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepo planRepo;
    private final PlanExerciseRepo planExerciseRepo;
    private final PlanMapper planMapper;
    private final PlanExerciseMapper planExerciseMapper;


    public Long save(PlanRequest planRequest, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        List<PlanExercise> planExercises = planExerciseRepo.findAllById
                 (planRequest.getPlanExerciseIds());

        Plan plan = Plan.builder()
                 .name(planRequest.getName())
                 .user(user)
                 .build();

        planExercises.forEach(exercises -> exercises.setWorkoutPlan(plan));
        plan.setPlanExercises(planExercises);

        return planRepo.save(plan).getId();
    }

    public List<PlanResponse> findAllUserPlans(Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        return planRepo.findAllByUserId(user.getId()).stream()
                .map(planMapper::toResponse)
                .toList();
    }

    public List<PlanExerciseResponse> findAllExercisesByTrainingId(Long id) {

        List<PlanExercise> planExercises = planRepo.findAllUserPlanExercisesByPlanId(id);

        return planExercises.stream()
                .map(planExerciseMapper::toResponse)
                .toList();
    }

    public PlanResponse findPlanById(Long id) {
        return planRepo.findById(id)
                .map(planMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found"));
    }
}
