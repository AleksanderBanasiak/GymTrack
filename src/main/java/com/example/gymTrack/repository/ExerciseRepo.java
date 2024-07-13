package com.example.gymTrack.repository;

import com.example.gymTrack.domain.entity.Exercise;
import com.example.gymTrack.domain.entity.ExerciseType;
import com.example.gymTrack.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepo extends JpaRepository<Exercise, Long> {


    Optional<Exercise> findByName(String name);

    Optional<Exercise> findByUser(User mainAdminUser);

     List<Exercise> findAllByUserId(Long user_id);

     List<Exercise> findAllByExerciseType(ExerciseType type);
}
