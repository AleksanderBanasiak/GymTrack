package com.example.gymTrack.controller;


import com.example.gymTrack.domain.dto.request.WeightRequest;
import com.example.gymTrack.domain.dto.response.WeightResponse;
import com.example.gymTrack.service.WeightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("weight")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService weightService;

    @PostMapping
    public ResponseEntity<Long> saveWeight(@RequestBody WeightRequest weightRequest, Authentication authUser){
        return ResponseEntity.ok(weightService.save(weightRequest, authUser));
    }


    @GetMapping("/all")
    public ResponseEntity<List<WeightResponse>> getAllUserWeight(Authentication authUser){
        return ResponseEntity.ok(weightService.getAllUserWeight(authUser));
    }


    @GetMapping("/monthly")
    public ResponseEntity<List<WeightResponse>> getUserWeightMonthly(@RequestParam("year") int year, @RequestParam("month") int month, Authentication authUser){
        return ResponseEntity.ok(weightService.getUserWeightMonthly(year, month, authUser));
    }

    @GetMapping("/months")
    public ResponseEntity<List<LocalDate>> getUserMonths(Authentication authUser){
        return ResponseEntity.ok(weightService.getAllUserMonths(authUser));
    }

}
