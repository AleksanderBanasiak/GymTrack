package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.dto.request.FavoriteExerciseRequest;
import com.example.gymTrack.domain.dto.response.FavoriteExerciseResponse;
import com.example.gymTrack.domain.entity.FavoriteExercise;
import com.example.gymTrack.mapper.Mapper;
import com.example.gymTrack.repository.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteExerciseMapper implements Mapper<FavoriteExercise, FavoriteExerciseResponse, FavoriteExerciseRequest> {


    private final ExerciseRepo exerciseRepo;

    @Override
    public FavoriteExercise toEntity(FavoriteExerciseRequest favoriteExerciseRequest) {
        return FavoriteExercise.builder()
                .exercise(exerciseRepo.findById(favoriteExerciseRequest.getExerciseId()).orElseThrow(() -> new IllegalArgumentException("Exercise not found")))
                .build();
    }

    @Override
    public FavoriteExerciseResponse toResponse(FavoriteExercise favoriteExercise) {
        return FavoriteExerciseResponse.builder()
                .id(favoriteExercise.getId())
                .exerciseId(favoriteExercise.getExercise().getId())
                .build();
    }
}
