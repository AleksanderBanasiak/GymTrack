package com.example.gymTrack.plan;

import com.example.gymTrack.common.BaseEntity;
import com.example.gymTrack.planExercise.PlanExercise;
import com.example.gymTrack.user.User;
import com.example.gymTrack.workoutSession.WorkoutSession;
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
@Table(name = "plans")
public class Plan extends BaseEntity {


    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "workoutPlan", fetch = FetchType.LAZY)
    private List<PlanExercise> planExercises;

    @OneToMany(mappedBy = "workoutPlan", fetch = FetchType.LAZY)
    private List<WorkoutSession> workoutSessions;


}
