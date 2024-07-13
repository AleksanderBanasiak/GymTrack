package com.example.gymTrack.domain.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest{


        @Email(message = "Not valid email format")
        @NotBlank(message = "Email is mandatory")
        @NotEmpty(message = "Email is mandatory")
        @NotBlank(message = "Email is mandatory")
        private String email;

        @NotEmpty(message = "Password is mandatory")
        @NotBlank(message = "Password is mandatory")
        @NotNull(message = "Password is mandatory")
        private String password;

}
