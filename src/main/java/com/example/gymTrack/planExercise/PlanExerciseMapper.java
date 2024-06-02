package com.example.gymTrack.planExercise;

import com.example.gymTrack.exercises.ExerciseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlanExerciseMapper {

    private final ExerciseMapper exerciseMapper;

    public PlanExercise mapPlanExerciseRequestToPlanExercise(PlanExerciseRequest request) {
        return PlanExercise.builder()
                .exercise(exerciseMapper.mapExerciseResponseToExercise(request.exercise()))
                .sets(request.sets())
                .build();
    }

    public PlanExerciseResponse mapPlanExerciseToPlanExerciseResponse(PlanExercise planExercise){
        return PlanExerciseResponse.builder()
                .id(planExercise.getId())
                .exerciseName(planExercise.getExercise().getName())
                .type(planExercise.getExercise().getExerciseType())
                .sets(planExercise.getSets())
                .build();
    }

    public PlanExercise mapPlanExerciseResponseToPlanExercise(PlanExerciseResponse planExerciseResponse){
        return PlanExercise.builder()
                .id(planExerciseResponse.getId())
                .sets(planExerciseResponse.getSets())
                .build();
    }



}
