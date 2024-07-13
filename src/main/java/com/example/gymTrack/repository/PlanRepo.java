package com.example.gymTrack.repository;


import com.example.gymTrack.domain.entity.Plan;
import com.example.gymTrack.domain.entity.PlanExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepo extends JpaRepository<Plan, Long> {

    @Query("""
        select plan from Plan plan where plan.user.id = :userId order by plan.id desc limit 1
        """)
    Plan findLastId(Long userId);

    @Query("""
        select plan from Plan plan where plan.user.id = :userId
        """)
    List<Plan> findAllByUserId(Long userId);


    @Query("""
        select plan.planExercises from Plan plan where plan.id = :id
        """)
    List<PlanExercise> findAllUserPlanExercisesByPlanId(Long id);
}
