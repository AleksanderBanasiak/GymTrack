package com.example.gymTrack.domain.entity;


import com.example.gymTrack.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exercises")
public class Exercise extends BaseEntity{



    private String name;
    private ExerciseType exerciseType;

    private boolean isDefault;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY)
    private List<PlanExercise> planExercises;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
