package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.response.WorkoutSessionResponse;
import com.example.gymTrack.domain.entity.WorkoutSession;
import com.example.gymTrack.mapper.iplm.WorkoutSessionMapper;
import com.example.gymTrack.repository.PlanRepo;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.repository.WorkoutSessionRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
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
        return lastUnsavedWorkoutSession.map(workoutSessionMapper::toResponse).orElse(null);
    }

    public void deleteWorkoutSession(Long id) {
        workoutSessionRepo.deleteById(id);
    }

    public WorkoutSessionResponse findById(Long id) {
        return workoutSessionRepo.findById(id)
                .map(workoutSessionMapper::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    public Long endSession(Long id) {
        WorkoutSession workoutSession = workoutSessionRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Session not found"));
        workoutSession.setEnded(true);
        return workoutSessionRepo.save(workoutSession).getId();
    }

    public List<WorkoutSessionResponse> findAllSessions(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return workoutSessionRepo.findAllByUserId(user.getId()).stream()
                .map(workoutSessionMapper::toResponse)
                .toList();
    }

    public List<WorkoutSessionResponse> findAllSessionsByMonth(Long month, Long yearId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        return workoutSessionRepo.findAllSessionsByMonth(month, yearId, user.getId()).stream()
                .map(workoutSessionMapper::toResponse)
                .toList();
    }

    public WorkoutSessionResponse findLastSession(Authentication authUser) {
        User user = (User) authUser.getPrincipal();

        Optional<WorkoutSession> lastByUserId = workoutSessionRepo.findLastByUserId(user.getId());

        return lastByUserId.map(workoutSessionMapper::toResponse)
                .orElse(null);
    }
}
