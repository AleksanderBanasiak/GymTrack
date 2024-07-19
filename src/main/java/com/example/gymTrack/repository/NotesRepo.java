package com.example.gymTrack.repository;

import com.example.gymTrack.domain.entity.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface NotesRepo extends JpaRepository<Notes, Long> {

    @Query("""
    select notes FROM Notes notes WHERE notes.user.id = :userId ORDER BY notes.id DESC
    """)
    List<Notes> findByUserId(Long userId);

    @Query("""
    select notes FROM Notes notes WHERE notes.exercise.id = :exerciseId AND notes.user.id = :userId ORDER BY notes.id DESC
    """)
    List<Notes> findByExerciseIdAndUserId(Long exerciseId, Long userId);
}
