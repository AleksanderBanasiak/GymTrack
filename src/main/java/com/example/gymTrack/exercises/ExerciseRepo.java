package com.example.gymTrack.exercises;

import com.example.gymTrack.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepo extends JpaRepository<Exercise, Long> {


    Optional<Exercise> findByName(String name);

    Optional<Exercise> findByUser(User mainAdminUser);

     List<Exercise> findAllByUserId(Long user_id);

     List<Exercise> findAllByExerciseType(ExerciseType type);
}
