package com.example.gymTrack.planExercise;

import com.example.gymTrack.common.BaseEntity;
import com.example.gymTrack.exercises.Exercise;
import com.example.gymTrack.plan.Plan;
import com.example.gymTrack.user.User;
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
@Table(name = "plan-exercise")
public class PlanExercise extends BaseEntity {

    private Integer sets;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan workoutPlan;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
