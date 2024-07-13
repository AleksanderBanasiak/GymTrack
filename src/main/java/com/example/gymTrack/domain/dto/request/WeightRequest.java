package com.example.gymTrack.domain.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class WeightRequest{


        @NotNull(message = "Weight is mandatory")
        @Positive
        @DecimalMin(value = "20", message = "Weight must be at least 20")
        @DecimalMax(value = "250", message = "Weight cannot exceed 250")
        private Double weight;

        @NotNull(message = "Date is mandatory")
        @PastOrPresent(message = "Date cannot be from the future")
        private LocalDate date;

}
