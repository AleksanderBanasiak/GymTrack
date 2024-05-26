package com.example.gymTrack.database;

import com.example.gymTrack.exercises.Exercise;
import com.example.gymTrack.exercises.ExerciseRepo;
import com.example.gymTrack.exercises.ExerciseType;
import com.example.gymTrack.role.Role;
import com.example.gymTrack.role.RoleRepo;
import com.example.gymTrack.user.User;
import com.example.gymTrack.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FillDatabase {

    private final UserRepo userRepo;
    private final ExerciseRepo exerciseRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public void fillDatabaseWithMandatoryExercises(){
        final User mainAdminUser = getMainAdmin();

        if(exerciseRepo.findByUser(mainAdminUser).isEmpty()){
            exerciseRepo.save(Exercise.builder()
                            .name("haha")
                            .exerciseType(ExerciseType.BICEPS)
                            .createdBy(mainAdminUser.getId())
                            .createdDate(LocalDateTime.now())
                            .user(mainAdminUser)
                    .build());
        }



    }

    private User getMainAdmin() {
        if(roleRepo.findByName("ADMIN").isEmpty()){
            roleRepo.save(Role.builder()
                    .name("ADMIN")
                    .build());
        }

        Role role = roleRepo.findByName("ADMIN").orElseThrow(() -> new IllegalArgumentException("Role not found"));

        final User mainAdminUser;

        if(userRepo.findFirstByRoles(role).isEmpty()){
            mainAdminUser = User.builder()
                    .email("admin@admin.com")
                    .password(passwordEncoder.encode("admin123"))
                    .accountLocked(false)
                    .enable(true)
                    .roles(List.of(role))
                    .build();
            userRepo.save(mainAdminUser);
        }else {
            mainAdminUser = userRepo.findFirstByRoles(role).orElseThrow(() -> new UsernameNotFoundException("Admin not found"));
        }
        return mainAdminUser;
    }
}
