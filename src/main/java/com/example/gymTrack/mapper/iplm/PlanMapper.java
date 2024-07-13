package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.dto.request.PlanRequest;
import com.example.gymTrack.domain.entity.ExerciseType;
import com.example.gymTrack.domain.entity.Plan;
import com.example.gymTrack.domain.dto.response.PlanResponse;
import com.example.gymTrack.domain.entity.PlanExercise;
import com.example.gymTrack.mapper.Mapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PlanMapper implements Mapper<Plan, PlanResponse, PlanRequest> {

    @Override
    public Plan toEntity(PlanRequest planRequest) {
        return null;
    }

    @Override
    public PlanResponse toResponse(Plan plan) {
        Set<ExerciseType> setMuscleGroups = plan.getPlanExercises().stream()
                .map(planExercise -> planExercise.getExercise().getExerciseType())
                .collect(Collectors.toSet());

        int sets = plan.getPlanExercises().stream()
                .mapToInt(PlanExercise::getSets)
                .sum();

        int exercises = plan.getPlanExercises().size();


        return PlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .muscleGroups(setMuscleGroups)
                .sets(sets)
                .exercises(exercises)
                .build();
    }






}
