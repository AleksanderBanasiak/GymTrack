package com.example.gymTrack.weight;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record WeightRequest(


        @NotNull(message = "Weight is mandatory")
        @Positive
        @DecimalMin(value = "20", message = "Weight must be at least 20")
        @DecimalMax(value = "250", message = "Weight cannot exceed 250")
        Double weight,

        @NotNull(message = "Date is mandatory")
        @PastOrPresent(message = "Date cannot be from the future")
        LocalDate date
) {
}
