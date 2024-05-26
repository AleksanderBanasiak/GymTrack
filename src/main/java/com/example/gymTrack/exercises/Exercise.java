package com.example.gymTrack.exercises;


import com.example.gymTrack.plan.Plan;
import com.example.gymTrack.planExercise.PlanExercise;
import com.example.gymTrack.user.User;
import com.example.gymTrack.common.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "exercises")
public class Exercise extends BaseEntity {

    private String name;
    private ExerciseType exerciseType;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY)
    private List<PlanExercise> planExercises;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
