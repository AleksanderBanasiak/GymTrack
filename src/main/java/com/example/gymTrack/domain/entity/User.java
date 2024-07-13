package com.example.gymTrack.domain.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;
    private String name;
    private String password;

    private boolean accountLocked;
    private boolean enable;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;


    @OneToMany(mappedBy = "user")
    private List<Exercise> exercises;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Plan> plans;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<WorkoutSession> workoutSessions;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<PlanExercise> planExercises;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Weight> weights;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @CreatedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
    }


}
