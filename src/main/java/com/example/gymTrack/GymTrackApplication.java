package com.example.gymTrack;

import com.example.gymTrack.database.FillDatabase;
import com.example.gymTrack.exercises.Exercise;
import com.example.gymTrack.exercises.ExerciseRepo;
import com.example.gymTrack.exercises.ExerciseType;
import com.example.gymTrack.role.Role;
import com.example.gymTrack.role.RoleRepo;
import com.example.gymTrack.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@RequiredArgsConstructor
public class GymTrackApplication {

	private final FillDatabase fillDatabase;

	public static void main(String[] args) {
		SpringApplication.run(GymTrackApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepo roleRepo){
		return args -> {
			if(roleRepo.findByName("USER").isEmpty()){
				roleRepo.save(Role.builder()
						.name("USER")
						.build());
			}
			fillDatabase.fillDatabaseWithMandatoryExercises();
		};
	}
}
