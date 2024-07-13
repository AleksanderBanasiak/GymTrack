package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.dto.request.PlanExerciseRequest;
import com.example.gymTrack.domain.dto.response.PlanExerciseResponse;
import com.example.gymTrack.domain.entity.PlanExercise;
import com.example.gymTrack.mapper.Mapper;
import com.example.gymTrack.repository.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlanExerciseMapper implements Mapper<PlanExercise, PlanExerciseResponse, PlanExerciseRequest> {

    private final ExerciseRepo exerciseRepo;


    @Override
    public PlanExercise toEntity(PlanExerciseRequest planExerciseRequest) {
        return PlanExercise.builder()
                .exercise(exerciseRepo.findById(planExerciseRequest.getExerciseId()).orElseThrow(() -> new IllegalArgumentException("Exercise not found")))
                .sets(planExerciseRequest.getSets())
                .build();
    }

    @Override
    public PlanExerciseResponse toResponse(PlanExercise planExercise) {
        return PlanExerciseResponse.builder()
                .id(planExercise.getId())
                .exerciseId(planExercise.getExercise().getId())
                .exerciseName(planExercise.getExercise().getName())
                .type(planExercise.getExercise().getExerciseType())
                .sets(planExercise.getSets())
                .build();
    }





}
