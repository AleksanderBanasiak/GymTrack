package com.example.gymTrack.workoutSession;

import com.example.gymTrack.plan.PlanRepo;
import com.example.gymTrack.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkoutSessionService {

    private final WorkoutSessionRepo workoutSessionRepo;
    private final WorkoutSessionMapper workoutSessionMapper;
    private final PlanRepo planRepo;

    public Long save(Long planId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        WorkoutSession workoutSession = WorkoutSession.builder()
                .user(user)
                .ended(false)
                .sessionDate(LocalDate.now())
                .workoutPlan(planRepo.findById(planId).orElseThrow(() -> new EntityNotFoundException("plan not found")))
                .build();

        return workoutSessionRepo.save(workoutSession).getId();
    }

    public WorkoutSessionResponse findLastUnsavedWorkoutSessionByUserId(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Optional<WorkoutSession> lastUnsavedWorkoutSession = workoutSessionRepo.findLastUnsavedWorkoutSessionByUserId(user.getId());
        return lastUnsavedWorkoutSession.map(workoutSessionMapper::mapWorkoutSessionToWorkoutSessionResponse).orElse(null);
    }

    public void deleteWorkoutSession(Long id) {
        workoutSessionRepo.deleteById(id);
    }
}
