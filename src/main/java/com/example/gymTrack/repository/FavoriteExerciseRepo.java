package com.example.gymTrack.repository;

import com.example.gymTrack.domain.entity.FavoriteExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteExerciseRepo extends JpaRepository<FavoriteExercise, Long> {


    @Query("""
    SELECT fav FROM FavoriteExercise fav WHERE fav.user.id = :userId
    """)
    List<FavoriteExercise> findByUserId(Long userId);
}
