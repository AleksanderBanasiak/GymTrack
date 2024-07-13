import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlanResponse} from "../../../../services/models/plan-response";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";
import {WorkoutSessionControllerService} from "../../../../services/services/workout-session-controller.service";
import {WorkoutSessionResponse} from "../../../../services/models/workout-session-response";

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit{

  training: PlanResponse | undefined;

  trainingExercises: PlanExerciseResponse[] =[];

  chosenPlanExercise: PlanExerciseResponse | undefined;


  sessionId = this.activatedRoute.snapshot.params['trainingId'];

  workoutSession: WorkoutSessionResponse | undefined;

  constructor(
    private planService: PlanControllerService,
    private workoutSessionService: WorkoutSessionControllerService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if(this.sessionId) {
     this.getWorkoutSession();
    }
  }

  private getWorkoutSession(){
    this.workoutSessionService.findSessionById({
      id: this.sessionId
    }).subscribe({
      next: (res) => {
        this.workoutSession = res;
        this.getTraining(res.planId as number);
      }
    })
  }

  private getTraining(id: number) {
    this.planService.findPlanById({
      plan_id: id
    }).subscribe({
      next: (training) => {
        this.training = training;

        this.planService.findAllExercisesByTrainingId({
          plan_id: id
        }).subscribe({
          next: ( exerciseResponse) => {
            this.trainingExercises = exerciseResponse;
            this.chosenPlanExercise = exerciseResponse[0];
          }
        })
      }
    })

  }


  // TODO:  dodać jeszcze tam przysisk do wyjscia z treningu który usuwa trening


  selectedExercise(exercise: PlanExerciseResponse) {
    this.chosenPlanExercise = exercise;
  }
}
