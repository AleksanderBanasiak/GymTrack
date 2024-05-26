package com.example.gymTrack.exercises;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("exercise")
public class ExerciseController {


    private final ExerciseService exerciseService;



    @PostMapping
    public ResponseEntity<Long> saveExercise(@RequestBody @Valid ExerciseRequest request, Authentication authUser){
       return ResponseEntity.ok(exerciseService.saveExercise(request, authUser));
    }

//    @GetMapping("{exercise_id}")
//    public ResponseEntity<ExerciseResponse> findExerciseById(@PathVariable("exercise_id") Long id){
//        return  ResponseEntity.ok(exerciseService.findById(id));
//    }


    @GetMapping("/my-exercises")
    public ResponseEntity<List<ExerciseResponse>> findAllUserExercises(Authentication authUser){
        return ResponseEntity.ok(exerciseService.findAllUserExercises(authUser));
    }

    @GetMapping("/my-exercises/{type}")
    public ResponseEntity<List<ExerciseResponse>> findAllUserExercisesByType(Authentication authUser,@PathVariable("type") ExerciseType type){
        return ResponseEntity.ok(exerciseService.findAllUserExercisesByType(authUser, type));
    }


    @GetMapping("/{type}")
    public ResponseEntity<List<ExerciseResponse>> findAllExercisesByType(@PathVariable("type") ExerciseType type, Authentication authUser){
        return ResponseEntity.ok(exerciseService.findAllExercisesByType(type, authUser));
    }


}
