import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanResponse} from "../../../../services/models/plan-response";
import {WorkoutSessionControllerService} from "../../../../services/services/workout-session-controller.service";
import {WorkoutSessionResponse} from "../../../../services/models/workout-session-response";
import {WeightControllerService} from "../../../../services/services/weight-controller.service";
import {WeightResponse} from "../../../../services/models/weight-response";
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {WorkoutLogsControllerService} from "../../../../services/services/workout-logs-controller.service";
import {WorkoutLogsResponse} from "../../../../services/models/workout-logs-response";
import {PlanExerciseControllerService} from "../../../../services/services/plan-exercise-controller.service";
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {SummaryResponse} from "../../../../services/models/summary-response";
import {FavoriteExerciseControllerService} from "../../../../services/services/favorite-exercise-controller.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  weightResponse: WeightResponse[] = [];
  exercise: ExerciseResponse | undefined;
  records: WorkoutLogsResponse[] = [];
  history: WorkoutLogsResponse[][] = [];
  session: WorkoutSessionResponse | undefined;
  planExerciseResponse:PlanExerciseResponse[] = [];
  chartLogs: WorkoutLogsResponse[] = [];
  summaryRes: SummaryResponse | undefined;

  constructor(
    private router: Router,
    private planService: PlanControllerService,
    private workoutSessionService: WorkoutSessionControllerService,
    private weightService: WeightControllerService,
    private workoutLogsService: WorkoutLogsControllerService,
    private planExerciseService: PlanExerciseControllerService,
    private exerciseService: ExerciseControllerService,
    private favoriteExerciseService: FavoriteExerciseControllerService
  ) {}

  ngOnInit(): void {
    this.backToLastWorkoutSession();
    this.getWeight();
    this.findLastWorkoutSession();
    this.summary();
    this.findFavExercise();
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

  private summary(){
    this.workoutLogsService.findSummaryLogs().subscribe({
      next: (res) => {
        this.summaryRes = res;
      }
    })
  }

  private getWeight(){
    this.weightService.getAllUserWeight().subscribe({
      next: (res) => {
        this.weightResponse = res;
      }
    })
  }
  private findLogsByExerciseId(){
    if (this.exercise?.id != null) {
      this.workoutLogsService.findAllLogsByExerciseIdAndUserId({
        id: this.exercise?.id
      }).subscribe({
        next: (res) => {
          this.chartLogs = res;
        }
      })
    }
  }
  private findLastWorkoutSession(){
    this.workoutSessionService.findLastSession().subscribe({
      next: (res) => {
        if(res && res.id){
          this.session = res;
          this.getAllExercisesNames(this.session.planId);
          this.findAllLogsBySessionId(res.id);
        }
      }
    })
  }

  private findAllLogsBySessionId(id: number){
      this.workoutLogsService.findAllLogsBySessionId({
          id: id
      }).subscribe({
          next: (res) => {
              this.history = res;
          }
      })
  }

  private getAllExercisesNames(id: number | undefined) {
    if (id) {
      this.planExerciseService.findAllPlanExercisesByPlanId({
        "plan-id": id
      }).subscribe({
        next: (res) => {
          this.planExerciseResponse = res;
        }
      })
    }
  }

  getTotalIndex(groupIndex: number, itemIndex: number): number {
    let totalIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      totalIndex += this.history[i].length + 1;
    }
    return totalIndex + itemIndex;
  }

  private findExercise(id: number){
    this.exerciseService.findExerciseById({
      exercise_id: id
    }).subscribe({
      next: (res) => {
        if(res){
          this.exercise = res;
          this.findRecordForExercise();
          this.findLogsByExerciseId();
        }
      }
    })
  }

  private findRecordForExercise(){
    if (this.exercise?.id != null) {
      this.workoutLogsService.findAllRecordByExerciseId({
        id: this.exercise?.id
      }).subscribe({
          next: (res) => {
            if(res){
              this.records = res;
            }
          },
          error: (err) => {
            console.error(`Error for exercise ${this.exercise?.id}:`, err);
          }
        });
    }
  }

  findFavExercise(){
    this.favoriteExerciseService.findFavouriteExerciseByUserId().subscribe({
      next: (res) => {
        if(res[0]){
          this.findExercise(res[0].exerciseId as number);
        }else {
          this.findExercise(1);
        }
      }
    })
  }

  getWeightInTons(weight: number | undefined): number {
    let weightInTons =0;
    if(weight){
      weightInTons = Math.round(weight /1000);
    }
    return weightInTons;
  }
}
