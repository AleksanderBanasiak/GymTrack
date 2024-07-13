package com.example.gymTrack.domain.entity;

import com.example.gymTrack.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "workout_session")
public class WorkoutSession extends BaseEntity {

    private boolean ended;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Temporal(TemporalType.DATE)
    private LocalDate sessionDate;

    @ManyToOne
    @JoinColumn(name = "workout_plan_id", nullable = false)
    private Plan workoutPlan;

    @OneToMany(mappedBy = "workoutSession", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<WorkoutLogs> workoutLogs;

}
