package com.example.gymTrack.service;


import com.example.gymTrack.domain.dto.request.PlanExerciseRequest;
import com.example.gymTrack.domain.dto.response.PlanExerciseResponse;
import com.example.gymTrack.domain.entity.Plan;
import com.example.gymTrack.domain.entity.PlanExercise;
import com.example.gymTrack.mapper.iplm.PlanExerciseMapper;
import com.example.gymTrack.repository.PlanExerciseRepo;
import com.example.gymTrack.repository.PlanRepo;
import com.example.gymTrack.domain.entity.User;
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
        PlanExercise planExercise = planExerciseMapper.toEntity(request);
        planExercise.setUser(user);
        return planExerciseRepo.save(planExercise).getId();
    }

    public Long saveForWorkout(PlanExerciseRequest request, Long workoutId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        PlanExercise planExercise = planExerciseMapper.toEntity(request);
        planExercise.setUser(user);
        planExercise.setWorkoutPlan(planRepo.findById(workoutId).orElseThrow(() -> new EntityNotFoundException("Workout not found")));
        return planExerciseRepo.save(planExercise).getId();
    }

    public List<PlanExerciseResponse> getAllPlanExerciseWithoutPlan(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return planExerciseRepo.findAllWherePlanIdIsNull(user.getId()).stream()
                .map(planExerciseMapper::toResponse)
                .toList();
    }

    public void deletePlanExercise(Long id) {
        planExerciseRepo.deleteById(id);
    }



}
