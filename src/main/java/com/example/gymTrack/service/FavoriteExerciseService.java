package com.example.gymTrack.service;

import com.example.gymTrack.domain.dto.request.FavoriteExerciseRequest;
import com.example.gymTrack.domain.dto.response.FavoriteExerciseResponse;
import com.example.gymTrack.domain.entity.FavoriteExercise;
import com.example.gymTrack.domain.entity.User;
import com.example.gymTrack.mapper.iplm.FavoriteExerciseMapper;
import com.example.gymTrack.repository.FavoriteExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteExerciseService {

    private final FavoriteExerciseRepo favoriteExerciseRepo;
    private final FavoriteExerciseMapper favoriteExerciseMapper;

    public Long save(FavoriteExerciseRequest favoriteExerciseRequest, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        FavoriteExercise favoriteExercise = favoriteExerciseMapper.toEntity(favoriteExerciseRequest);
        favoriteExercise.setUser(user);
        return favoriteExerciseRepo.save(favoriteExercise).getId();
    }

    public void deleteFavoriteExercise(Long id) {
        favoriteExerciseRepo.deleteById(id);
    }

    public List<FavoriteExerciseResponse> findFavouriteExerciseByUserId(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return favoriteExerciseRepo.findByUserId(user.getId()).stream()
                .map(favoriteExerciseMapper::toResponse)
                .toList();
    }
}
