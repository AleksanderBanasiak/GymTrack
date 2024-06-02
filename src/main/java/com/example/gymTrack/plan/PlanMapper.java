package com.example.gymTrack.plan;

import com.example.gymTrack.exercises.ExerciseType;
import com.example.gymTrack.planExercise.PlanExercise;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PlanMapper {
    public PlanResponse mapPlanToPlanResponse(Plan plan) {

        List<ExerciseType> muscleGroups = plan.getPlanExercises().stream()
                .map(planExercise -> planExercise.getExercise().getExerciseType())
                .toList();

        int sets = plan.getPlanExercises().stream()
                .mapToInt(PlanExercise::getSets)
                .sum();

        int exercises = plan.getPlanExercises().size();

        Set<ExerciseType> setMuscleGroups = new HashSet<>(muscleGroups);

        return PlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .muscleGroups(setMuscleGroups)
                .sets(sets)
                .exercises(exercises)
                .build();
    }



}
