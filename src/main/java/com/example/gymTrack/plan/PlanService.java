package com.example.gymTrack.plan;

import com.example.gymTrack.planExercise.PlanExercise;
import com.example.gymTrack.planExercise.PlanExerciseMapper;
import com.example.gymTrack.planExercise.PlanExerciseRepo;
import com.example.gymTrack.planExercise.PlanExerciseResponse;
import com.example.gymTrack.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepo planRepo;
    private final PlanExerciseRepo planExerciseRepo;
    private final PlanMapper planMapper;
    private final PlanExerciseMapper planExerciseMapper;


    public Long save(PlanRequest planRequest, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

         List<PlanExercise> exercises = planExerciseRepo.findAllById
                 (planRequest.planExerciseResponses().stream()
                 .map(PlanExerciseResponse::getId).toList());

         Plan plan = Plan.builder()
                 .planExercises(exercises)
                 .name(planRequest.name())
                 .user(user)
                 .build();
        return planRepo.save(plan).getId();
    }

    public List<PlanResponse> findAllUserPlans(Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        return planRepo.findAllByUserId(user.getId()).stream()
                .map(planMapper::mapPlanToPlanResponse)
                .toList();
    }

    public List<PlanExerciseResponse> findAllExercisesByTrainingId(Long id) {

        List<PlanExercise> planExercises = planRepo.findAllUserPlanExercisesByPlanId(id);

        return planExercises.stream()
                .map(planExerciseMapper::mapPlanExerciseToPlanExerciseResponse)
                .toList();
    }
}
