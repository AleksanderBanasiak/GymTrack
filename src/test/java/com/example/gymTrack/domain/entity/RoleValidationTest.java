package com.example.gymTrack.domain.entity;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class RoleValidationTest {


    private Validator validator;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }



    @Test
    public void whenNameIsValid_thenNoConstraintViolations() {
        Role role = Role.builder()
                .name("ADMIN")
                .build();

        Set<ConstraintViolation<Role>> violations = validator.validate(role);
        assertTrue(violations.isEmpty());
    }

    @Test
    public void whenNameIsNull_thenConstraintViolations() {
        Role role = Role.builder()
                .name(null)
                .build();

        Set<ConstraintViolation<Role>> violations = validator.validate(role);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().toLowerCase().contains("null"));
    }
}
