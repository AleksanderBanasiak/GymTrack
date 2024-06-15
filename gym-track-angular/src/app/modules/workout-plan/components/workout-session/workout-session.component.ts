import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlanResponse} from "../../../../services/models/plan-response";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {ExerciseResponse} from "../../../../services/models/exercise-response";

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit{

  training: PlanResponse | undefined;

  trainingExercises: ExerciseResponse[] =[];
  trainingId = this.activatedRoute.snapshot.params['trainingId'];

  constructor(
    private planService: PlanControllerService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    if(this.trainingId) {
      this.getTraining(this.trainingId);
    }

  }

  private getTraining(id: number) {
    this.planService.findPlanById({
      plan_id: id
    }).subscribe({
      next: (training) => {
        this.training = training;
        console.log(this.training);

        this.planService.findAllExercisesByTrainingId({
          plan_id: id
        }).subscribe({
          next: ( exerciseResponse) => {
            this.trainingExercises = exerciseResponse;
            console.log(this.trainingExercises);
          }
        })
      }
    })

  }


  // TODO:  dodać jeszcze tam przysisk do wyjscia z treningu który usuwa trening





}
