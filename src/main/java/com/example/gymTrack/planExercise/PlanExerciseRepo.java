package com.example.gymTrack.planExercise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanExerciseRepo extends JpaRepository<PlanExercise, Long> {

    @Query("""
        SELECT planExercise FROM PlanExercise planExercise WHERE planExercise.user.id = :userId AND planExercise.workoutPlan is null
        """)
    List<PlanExercise> findAllWherePlanIdIsNull(Long userId);


}
