package com.example.gymTrack.repository;


import com.example.gymTrack.domain.entity.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutSessionRepo extends JpaRepository<WorkoutSession, Long> {


    @Query("""
        SELECT workout FROM WorkoutSession workout where workout.ended = false and workout.user.id = :userId order by workout.id desc limit 1
        """)
    Optional<WorkoutSession> findLastUnsavedWorkoutSessionByUserId(Long userId);
}
