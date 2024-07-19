package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.request.ExerciseRequest;
import com.example.gymTrack.domain.dto.response.ExerciseResponse;
import com.example.gymTrack.domain.entity.Exercise;
import com.example.gymTrack.domain.entity.ExerciseType;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.mapper.iplm.ExerciseMapper;
import com.example.gymTrack.repository.ExerciseRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepo exerciseRepo;
    private final ExerciseMapper exerciseMapper;


    public Long saveExercise(ExerciseRequest request, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Exercise exercise = exerciseMapper.toEntity(request);
        exercise.setUser(user);
        return exerciseRepo.save(exercise).getId();
    }

    public ExerciseResponse findById(Long id) {
        return exerciseRepo.findById(id)
                .map(exerciseMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Exercise not found"));
    }

    public List<ExerciseResponse> findAllUserExercises(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return exerciseRepo.findAllByUserId(
                user.getId()).stream()
                .map(exerciseMapper::toResponse)
                .toList();
    }

    public List<ExerciseResponse> findAllUserExercisesByType(Authentication authUser, ExerciseType type) {
        User user = (User) authUser.getPrincipal();
        return exerciseRepo.findAllByUserId(
                        user.getId()).stream()
                .filter(exercise -> exercise.getExerciseType()== type)
                .map(exerciseMapper::toResponse)
                .toList();
    }

    public List<ExerciseResponse> findAllExercisesByType(ExerciseType type, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return exerciseRepo.findAllByExerciseType(type).stream()
                .filter(exercise -> Objects.equals(exercise.getUser().getId(), user.getId()) ||  exercise.isDefault())
                .map(exerciseMapper::toResponse)
                .toList();
    }

    public void deleteExercise(Long id) {
        exerciseRepo.deleteById(id);
    }


}
