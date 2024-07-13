package com.example.gymTrack.mapper.iplm;

import com.example.gymTrack.domain.entity.Weight;
import com.example.gymTrack.domain.dto.request.WeightRequest;
import com.example.gymTrack.domain.dto.response.WeightResponse;
import com.example.gymTrack.mapper.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeightMapper implements Mapper<Weight, WeightResponse, WeightRequest> {

    private final ModelMapper modelMapper;

    @Override
    public Weight toEntity(WeightRequest weightRequest) {
        return modelMapper.map(weightRequest, Weight.class);
    }

    @Override
    public WeightResponse toResponse(Weight weight) {
        return modelMapper.map(weight, WeightResponse.class);
    }

}
