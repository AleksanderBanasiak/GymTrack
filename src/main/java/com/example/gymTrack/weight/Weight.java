package com.example.gymTrack.weight;


import com.example.gymTrack.common.BaseEntity;
import com.example.gymTrack.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "weight")
public class Weight extends BaseEntity {


    @Temporal(TemporalType.DATE)
    private LocalDate date;

    private Double weight;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
