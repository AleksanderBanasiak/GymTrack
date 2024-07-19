package com.example.gymTrack.repository;

import com.example.gymTrack.domain.entity.WorkoutLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutLogsRepo extends JpaRepository<WorkoutLogs, Long> {

    @Query("""
    SELECT logs from WorkoutLogs logs WHERE logs.workoutSession.id = :sessionId
    """)
    List<WorkoutLogs> findAllWorkoutLogsBySessionId(Long sessionId);


    @Query("""
        select logs FROM WorkoutLogs logs WHERE logs.planExercise.exercise.id = :exerciseId AND logs.workoutSession.user.id = :userId
        
        """
    )
    List<WorkoutLogs> findAllLogsByExerciseIdAndUserId(Long exerciseId, Long userId);
    @Query("""
        select logs FROM WorkoutLogs logs WHERE logs.planExercise.exercise.id = :exerciseId AND logs.workoutSession.user.id = :userId
        AND logs.workoutSession.id != :sessionId
        order by logs.setNumber ASC
        """
    )
    List<WorkoutLogs> findAllLogsByExerciseIdAndUserIdOrderBySetNumberAsc(Long exerciseId, Long userId, Long sessionId);

    @Query("""
    SELECT logs FROM WorkoutLogs logs
    WHERE logs.planExercise.exercise.id = :exerciseId
    AND logs.workoutSession.user.id = :userId
    AND logs.weight = (
        SELECT MAX(innerLogs.weight) FROM WorkoutLogs innerLogs
        WHERE innerLogs.workoutSession.id = logs.workoutSession.id
        AND innerLogs.planExercise.exercise.id = :exerciseId
        
    )
    """
    )
    List<WorkoutLogs> findLogsByExerciseMaxIdAndUserId(Long exerciseId, Long userId);


    @Query("""
    SELECT logs FROM WorkoutLogs logs WHERE logs.planExercise.id = :planExerciseId AND logs.workoutSession.id = :sessionId
    """)
    List<WorkoutLogs> findAllLogsBySessionIdAndExerciseId(Long planExerciseId, Long sessionId);


    @Query("""
    SELECT logs FROM WorkoutLogs logs
    WHERE logs.planExercise.exercise.id = :exerciseId
    AND logs.workoutSession.user.id = :userId
    AND logs.weight = (
        SELECT MAX(innerLogs.weight) FROM WorkoutLogs innerLogs
        WHERE innerLogs.workoutSession.id = logs.workoutSession.id
        AND innerLogs.planExercise.exercise.id = :exerciseId
    )
    ORDER BY logs.weight DESC
    LIMIT 1
    """)
    WorkoutLogs findLogsByExerciseOneRepMax(Long exerciseId, Long userId);

    @Query("""
    SELECT logs FROM WorkoutLogs logs
    WHERE logs.planExercise.exercise.id = :exerciseId
    AND logs.workoutSession.user.id = :userId
    AND logs.summaryWeight = (
        SELECT MAX(innerLogs.summaryWeight) FROM WorkoutLogs innerLogs
        WHERE innerLogs.workoutSession.id = logs.workoutSession.id
        AND innerLogs.planExercise.exercise.id = :exerciseId
    )
    ORDER BY logs.summaryWeight DESC
    LIMIT 1
    """)
    WorkoutLogs findLogsByExerciseBestSet(Long exerciseId, Long userId);




    @Query("""
    SELECT logs FROM WorkoutLogs logs
    WHERE logs.planExercise.exercise.id = :exerciseId
    AND logs.workoutSession.user.id = :userId
    AND logs.workoutSession.id = (
        SELECT innerLogs.workoutSession.id FROM WorkoutLogs innerLogs
        WHERE innerLogs.planExercise.exercise.id = :exerciseId
        AND innerLogs.workoutSession.user.id = :userId
        GROUP BY innerLogs.workoutSession.id
        ORDER BY SUM(innerLogs.summaryWeight) DESC
        LIMIT 1
    )
    """)
    List<WorkoutLogs> findLogsByExerciseBestSets(Long exerciseId, Long userId);

    @Query("""
    SELECT COUNT(log) > 0 FROM WorkoutLogs log WHERE log.planExercise.exercise.id = :id
    """)
    boolean findByExerciseId(Long id);
}
