package com.example.gymTrack.controller;

import com.example.gymTrack.domain.dto.request.FavoriteExerciseRequest;
import com.example.gymTrack.domain.dto.request.PlanRequest;
import com.example.gymTrack.domain.dto.response.FavoriteExerciseResponse;
import com.example.gymTrack.service.FavoriteExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("favorite-exercise")
public class FavoriteExerciseController {


    private final FavoriteExerciseService favoriteExerciseService;

    @PostMapping
    public ResponseEntity<Long> save(@RequestBody @Valid FavoriteExerciseRequest favoriteExerciseRequest, Authentication authUser){
        return ResponseEntity.ok(favoriteExerciseService.save(favoriteExerciseRequest, authUser));
    }

    @DeleteMapping("/{id}")
    public void deleteFavoriteExercise(@PathVariable Long id) {
        favoriteExerciseService.deleteFavoriteExercise(id);
    }

    @GetMapping
    public ResponseEntity<List<FavoriteExerciseResponse>> findFavouriteExerciseByUserId(Authentication authUser){
        return ResponseEntity.ok(favoriteExerciseService.findFavouriteExerciseByUserId(authUser));
    }


}
