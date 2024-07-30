package com.example.gymTrack.domain.entity;


import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


public class TokenValidationTest {

    private Validator validator;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void whenTokenIsValid_thenNoConstraintViolations() {
        Token token = Token.builder()
                .token("valid-token")
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))
                .user(new User()) // Assuming User object is valid
                .build();

        Set<ConstraintViolation<Token>> violations = validator.validate(token);
        assertTrue(violations.isEmpty());
    }

    @Test
    public void whenTokenIsNull_thenConstraintViolations() {
        Token token = Token.builder()
                .token(null)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))
                .user(new User()) // Assuming User object is valid
                .build();

        Set<ConstraintViolation<Token>> violations = validator.validate(token);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().toLowerCase().contains("null"));
    }

}
