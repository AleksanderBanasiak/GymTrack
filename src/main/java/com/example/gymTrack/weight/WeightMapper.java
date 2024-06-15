package com.example.gymTrack.weight;

import org.springframework.stereotype.Service;

@Service
public class WeightMapper {
    public Weight mapWeightRequestToWeight(WeightRequest weightRequest) {
        return Weight.builder()
                .date(weightRequest.date())
                .weight(weightRequest.weight())
                .build();
    }

    public WeightResponse mapWeightToWeightResponse(Weight weight) {
        return WeightResponse.builder()
                .id(weight.getId())
                .weight(weight.getWeight())
                .date(weight.getDate())
                .build();
    }
}
