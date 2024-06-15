package com.example.gymTrack.weight;

import com.example.gymTrack.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WeightService {


    private final WeightRepo weightRepo;
    private final WeightMapper weightMapper;

    public Long save(WeightRequest weightRequest, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Weight weight = weightMapper.mapWeightRequestToWeight(weightRequest);
        weight.setUser(user);
        return weightRepo.save(weight).getId();
    }

    public List<WeightResponse> getAllUserWeight(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return weightRepo.findAllByUserId(user.getId()).stream()
                .map(weightMapper::mapWeightToWeightResponse)
                .toList();
    }

    public List<WeightResponse> getUserWeightMonthly(int year, int month, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return weightRepo.findAllByMonth(user.getId(), year, month).stream()
                .map(weightMapper::mapWeightToWeightResponse)
                .toList();
    }

    public List<LocalDate> getAllUserMonths(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        List<LocalDate> dates = weightRepo.findAllDateByUserId(user.getId()).stream()
                .collect(Collectors.groupingBy(date -> date.withDayOfMonth(1)))
                .values()
                .stream()
                .map(dateList -> dateList.stream().min(LocalDate::compareTo).orElseThrow())
                .sorted()
                .toList();

        return dates;
    }
}
