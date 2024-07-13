import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanResponse} from "../../../../services/models/plan-response";
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.css']
})
export class TrainingPlansComponent implements OnInit{

  planResponse: PlanResponse[] | undefined;

  planExerciseResponse: PlanExerciseResponse[] | undefined;

  planName: string | undefined;


  constructor(
    private router: Router,
    private planService: PlanControllerService
  ) {
  }

  addTraining() {
    this.router.navigate(['training']);
  }

  ngOnInit(): void {
    this.displayTrainings();
  }


  private displayTrainings() {
    this.planService.findAllUserPlans().subscribe({
      next: (planRes) => {
        this.planResponse = planRes.reverse();
        if(this.planResponse != null){
          this.displayAllExercises(this.planResponse[0].id);

        }
      }
    })
  }

  // TODO: dodać usuwanie treningu


  displayAllExercises(id: number | undefined){
    if(id){
      this.planService.findAllExercisesByTrainingId({
        plan_id: id
      }).subscribe({
        next: (res) => {
          this.planExerciseResponse = res;
          this.findPlanById(id);
        }
      })
    }

  }

  findPlanById(id: number | undefined){
    this.planService.findPlanById({
      plan_id: id as number
    }).subscribe({
      next: (res) => {
        this.planName = res.name;
      }
    })
  }


  editTraining(id: number | undefined) {
    if(id){
      this.router.navigate(['training', id]);
    }
  }


}
