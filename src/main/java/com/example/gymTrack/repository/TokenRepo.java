package com.example.gymTrack.repository;

import com.example.gymTrack.domain.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepo extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
}
