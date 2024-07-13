package com.example.gymTrack.domain.entity;


import com.example.gymTrack.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "workout_logs")
public class WorkoutLogs extends BaseEntity {


    private Integer setNumber;
    private Double weight;
    private Integer reps;
    private Double summaryWeight;

    @ManyToOne
    @JoinColumn(name = "workoutSession_id", nullable = false)
    private WorkoutSession workoutSession;


    @ManyToOne
    @JoinColumn(name = "plan_exercise_id", nullable = false)
    private PlanExercise planExercise;
}
