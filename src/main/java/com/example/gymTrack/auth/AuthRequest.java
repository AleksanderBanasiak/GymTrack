package com.example.gymTrack.auth;

import jakarta.validation.constraints.*;

public record AuthRequest(


        @Email(message = "Not valid email format")
        @NotBlank(message = "Email is mandatory")
        @NotEmpty(message = "Email is mandatory")
        @NotBlank(message = "Email is mandatory")
        String email,

        @NotEmpty(message = "Password is mandatory")
        @NotBlank(message = "Password is mandatory")
        @NotNull(message = "Password is mandatory")
        String password
) {
}
