package com.example.gymTrack;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@RequiredArgsConstructor
public class GymTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(GymTrackApplication.class, args);
	}


}
