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

import java.time.LocalDate;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notes")
public class Notes extends BaseEntity {

    private String note;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "exerciseId", nullable = false)
    private Exercise exercise;


    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;
}
