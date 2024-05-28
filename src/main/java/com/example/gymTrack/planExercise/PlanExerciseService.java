package com.example.gymTrack.planExercise;


import com.example.gymTrack.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanExerciseService {


    private final PlanExerciseRepo planExerciseRepo;

    public Long save(PlanExerciseRequest request, Authentication authUser) {
        User user = (User) authUser.getPrincipal();



        return null;
    }

    public List<PlanExerciseResponse> getAllPlanExerciseWithoutPlan(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        


        return null;
    }
}
