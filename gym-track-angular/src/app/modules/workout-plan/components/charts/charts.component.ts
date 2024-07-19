import {Component, OnInit} from '@angular/core';
import {PlanExerciseControllerService} from "../../../../services/services/plan-exercise-controller.service";
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {WorkoutLogsControllerService} from "../../../../services/services/workout-logs-controller.service";
import {WorkoutLogsResponse} from "../../../../services/models/workout-logs-response";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{

  exercises: ExerciseResponse[] = [];

  chosenExercise: ExerciseResponse | undefined;
  chartLogs: WorkoutLogsResponse[] = [];
  chartMaxLogs: WorkoutLogsResponse[] = [];
  chartStyle2 = "#2a2929";

  constructor(
    private planExerciseService: PlanExerciseControllerService,
    private workoutLogsService: WorkoutLogsControllerService
  ) {
  }

  ngOnInit(): void {
    this.findAllUsedExercises();
  }

  private findAllUsedExercises(){
    this.planExerciseService.findAllUserUsedExercises().subscribe({
      next: (res) => {
        this.exercises = res;
        if(this.exercises.length > 0){
          const chosenExercise = localStorage.getItem('chosenExercise');
          localStorage.removeItem('chosenExercise');
          if (chosenExercise != null) {
            this.chosenExercise = JSON.parse(chosenExercise);
          }else {
            this.chosenExercise = this.exercises[0];
          }
          this.findLogsByExerciseId(this.chosenExercise?.id as number);
          this.findMaxesByExerciseId(this.chosenExercise?.id as number);
        }
      }
    })
  }

  onChosenExerciseChange(exercise: ExerciseResponse) {
    localStorage.setItem('chosenExercise', JSON.stringify(exercise));
    window.location.reload();
  }

  private findLogsByExerciseId(id: number){
    this.workoutLogsService.findAllLogsByExerciseIdAndUserId({
      id: id
    }).subscribe({
      next: (res) => {
        this.chartLogs = res;
      }
    })
  }

  private findMaxesByExerciseId(id: number){
    this.workoutLogsService.findAllLogsMaxByExerciseIdAndUserId({
      id: id
    }).subscribe({
      next: (res) =>{
        this.chartMaxLogs = res;
      }
    })
  }

  compareExercises(e1: ExerciseResponse, e2: ExerciseResponse): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

}
