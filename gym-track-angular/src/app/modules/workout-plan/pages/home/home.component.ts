import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanResponse} from "../../../../services/models/plan-response";
import {WorkoutSessionControllerService} from "../../../../services/services/workout-session-controller.service";
import {WorkoutSessionResponse} from "../../../../services/models/workout-session-response";
import {UserControllerService} from "../../../../services/services/user-controller.service";

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

  plan: PlanResponse | undefined;

  userName: string | undefined;


  constructor(
    private router: Router,
    private planService: PlanControllerService,
    private workoutSessionService: WorkoutSessionControllerService,
    private userService: UserControllerService
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
          this.findPlan();
        }
      }
    })
  }

  startTraining(id: number | undefined) {
    this.createSession(id);
  }

  onContainerClick() {
    if(this.setTraining){
      this.setTraining =!this.setTraining;
    }
  }

  chosenPlan(res: PlanResponse) {
    this.selectedTraining = res;
    this.planId = res.id as number;
  }

  private checkIsUnsaved() {
    this.isUnsaved = !!this.workoutSessionResponse;
    this.maxBlur = this.isUnsaved;
  }

  private findPlan(){
    this.planService.findPlanById({
      plan_id: this.workoutSessionResponse?.planId as number
    }).subscribe({
      next: (res) => {
        this.plan = res;
      }
    })
  }

  deleteWorkout() {
    this.workoutSessionService.deleteWorkoutSession({
      id: this.workoutSessionResponse?.id as number
    }).subscribe({
      next: () => {
        localStorage.removeItem('chosenPlanExercise');
        localStorage.removeItem('sessionId');
        window.location.reload();
      }
    })
  }

  backToLastWorkout() {
    this.router.navigate(['workout-session', this.workoutSessionResponse?.id as number]);
  }


  // TODO: to nie działa a zwraca 200 ok
  private findUserName(){
    this.userService.getUserName().subscribe({
      next: (res) => {
        console.log(res);
        this.userName = res;
      }
    })
  }

}
