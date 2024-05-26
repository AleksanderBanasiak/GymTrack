package com.example.gymTrack.workoutLogs;


import com.example.gymTrack.common.BaseEntity;
import com.example.gymTrack.plan.Plan;
import com.example.gymTrack.workoutSession.WorkoutSession;
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


    @ManyToOne
    @JoinColumn(name = "workoutSession_id", nullable = false)
    private WorkoutSession workoutSession;
}
