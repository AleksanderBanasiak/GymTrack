import {Component, OnInit} from '@angular/core';
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {Router} from "@angular/router";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanResponse} from "../../../../services/models/plan-response";
import {WorkoutSessionControllerService} from "../../../../services/services/workout-session-controller.service";
import {WorkoutSessionResponse} from "../../../../services/models/workout-session-response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  setTraining = false;

  planResponse: PlanResponse[] | undefined;

  selectedTraining: PlanResponse | undefined;

  planId: number | undefined;

  workoutSessionResponse: WorkoutSessionResponse | undefined;

  isUnsaved = false;

  maxBlur = false;


  constructor(
    private router: Router,
    private planService: PlanControllerService,
    private workoutSessionService: WorkoutSessionControllerService
  ) {}

  ngOnInit(): void {
    this.backToLastWorkoutSession();

  }



  chooseTraining(event: Event) {
    event.stopPropagation();
    this.setTraining = true;

    this.planService.findAllUserPlans().subscribe({
      next: (planRes) => {
        this.planResponse = planRes;
      }
    })
  }

  private createSession(id: number | undefined){
    if(id){
      this.workoutSessionService.saveWorkoutSession({
        body: id
      }).subscribe({
        next: (res) => {
          this.router.navigate(['workout-session', res as number]);
        }
      })
    }
  }

  private backToLastWorkoutSession(){
    this.workoutSessionService.findLastUnsavedWorkoutSessionByUserId().subscribe({
      next: (res) => {
        this.workoutSessionResponse = res;
        this.checkIsUnsaved();

        if (this.workoutSessionResponse) {
          const date = new Date(this.workoutSessionResponse?.sessionDate as string);
          const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long', year: 'numeric'};
          this.workoutSessionResponse.sessionDate = date.toLocaleDateString('en-US', options);
          console.log(this.workoutSessionResponse.sessionDate);
        }

      }
    })
  }


  startTraining(id: number | undefined) {
    this.createSession(id);
  }


  onContainerClick() {
      this.setTraining =!this.setTraining;
  }

  chosenPlan(res: PlanResponse) {
    this.selectedTraining = res;
    this.planId = res.id as number;
  }

  private checkIsUnsaved() {
    // if(this.workoutSessionResponse){
    //   this.isUnsaved = true;
    //   this.maxBlur = true;
    // }
    this.isUnsaved = !!this.workoutSessionResponse;
    this.maxBlur = this.isUnsaved;
  }

  // TODO: nie usuwa workoutLogs przez co nie można usunąc sesji która zawiera logs
  deleteWorkout() {
    this.workoutSessionService.deleteWorkoutSession({
      id: this.workoutSessionResponse?.id as number
    }).subscribe({
      next: () => {
        window.location.reload();
      }
    })
  }

  backToLastWorkout() {

  }
}
