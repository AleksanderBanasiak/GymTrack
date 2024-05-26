package com.example.gymTrack.workoutSession;

import com.example.gymTrack.common.BaseEntity;
import com.example.gymTrack.plan.Plan;
import com.example.gymTrack.planExercise.PlanExercise;
import com.example.gymTrack.user.User;
import com.example.gymTrack.workoutLogs.WorkoutLogs;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "workout_session")
public class WorkoutSession extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "workout_plan_id", nullable = false)
    private Plan workoutPlan;

    @OneToMany(mappedBy = "workoutSession", fetch = FetchType.LAZY)
    private List<WorkoutLogs> workoutLogs;

}
