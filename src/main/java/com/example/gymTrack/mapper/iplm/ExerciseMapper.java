package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.dto.request.ExerciseRequest;
import com.example.gymTrack.domain.dto.response.ExerciseResponse;
import com.example.gymTrack.domain.entity.Exercise;
import com.example.gymTrack.mapper.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExerciseMapper implements Mapper<Exercise, ExerciseResponse, ExerciseRequest> {

    private final ModelMapper modelMapper;

    @Override
    public Exercise toEntity(ExerciseRequest exerciseRequest3) {
        return modelMapper.map(exerciseRequest3, Exercise.class);
    }

    @Override
    public ExerciseResponse toResponse(Exercise exercise) {
        return modelMapper.map(exercise, ExerciseResponse.class);
    }

// TODO: tak nie może być!
    public Exercise mapExerciseResponseToExercise(ExerciseResponse exercise) {
        return Exercise.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .exerciseType(exercise.getType())
                .build();
    }


}