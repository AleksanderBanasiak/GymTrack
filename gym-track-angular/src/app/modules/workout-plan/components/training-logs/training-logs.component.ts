import {Component, OnInit} from '@angular/core';
import {WorkoutSessionControllerService} from "../../../../services/services/workout-session-controller.service";
import {WorkoutSessionResponse} from "../../../../services/models/workout-session-response";
import {Router} from "@angular/router";
import {WorkoutLogsControllerService} from "../../../../services/services/workout-logs-controller.service";
import {WorkoutLogsResponse} from "../../../../services/models/workout-logs-response";
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PlanExerciseControllerService} from "../../../../services/services/plan-exercise-controller.service";
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";

@Component({
  selector: 'app-training-logs',
  templateUrl: './training-logs.component.html',
  styleUrls: ['./training-logs.component.css']
})
export class TrainingLogsComponent implements OnInit{

  workouts: WorkoutSessionResponse[] = [];
  logsId: number | undefined;
  history: WorkoutLogsResponse[][] = [];
  session: WorkoutSessionResponse | undefined;
  exercises: ExerciseResponse[] | undefined;
  planExerciseResponse:PlanExerciseResponse[] = [];

 constructor(
   private workoutSessionService: WorkoutSessionControllerService,
   private workoutLogsService: WorkoutLogsControllerService,
   private planExerciseService: PlanExerciseControllerService,
   private router: Router
 ) {
 }

  ngOnInit(): void {
   this.findAllSessions();
  }

  private findAllSessions(){
   this.workoutSessionService.findAllSessions().subscribe({
     next: (res) => {
       this.workouts = res;

       const logsId = localStorage.getItem('logsId');
       localStorage.removeItem('logsId');
       if (logsId != null) {
         this.logsId = JSON.parse(logsId);
       }else {
         this.logsId = this.workouts[0].id;
       }

       this.findSessionById(this.logsId as number);
       this.findAllLogsBySessionId(this.logsId as number);
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

  private findSessionById(id: number){
    this.workoutSessionService.findSessionById({
      id: id
    }).subscribe({
      next: (res) => {
        this.session = res;
        this.getAllExercisesNames(this.session.planId);
      }
    })
  }

  editTraining() {
    this.router.navigate(['workout-session', this.logsId as number]);
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

  displayLogs(id: number | undefined) {
    this.logsId = id;
    localStorage.setItem('logsId', JSON.stringify(this.logsId));
    window.location.reload();
  }

    getTotalIndex(groupIndex: number, itemIndex: number): number {
        let totalIndex = 0;
        for (let i = 0; i < groupIndex; i++) {
            totalIndex += this.history[i].length + 1;
        }
        return totalIndex + itemIndex;
    }
}
