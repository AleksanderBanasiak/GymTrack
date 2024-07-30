import {Component, OnInit} from '@angular/core';
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {WorkoutLogsControllerService} from "../../../../services/services/workout-logs-controller.service";
import {WorkoutLogsResponse} from "../../../../services/models/workout-logs-response";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit{


  exerciseTypes: ExerciseResponse['type'][] = [
    'CHEST' , 'SHOULDERS' , 'BICEPS' , 'TRICEPS' , 'FOREARM', 'TRAPS' , 'LATS' , 'MIDDLE_BACK' , 'LOW_BACK' , 'ABS' , 'QUADRICEPS' , 'GLUTES' , 'ABDUCTORS' , 'ADDUCTORS' , 'HAMSTRINGS' , 'CALF'
  ];

  chosenExerciseType: ExerciseResponse['type'] = 'CHEST';
  exercises: ExerciseResponse[] =[];
  exerciseRecords: { [key: number]: WorkoutLogsResponse[] } = {};

  constructor(
      private exerciseService: ExerciseControllerService,
      private workoutLogsService: WorkoutLogsControllerService
  ) {
  }

  ngOnInit(): void {
    this.findAllExercisesByType();
  }

  private findAllExercisesByType(){
    const type = localStorage.getItem('type');
    localStorage.removeItem('type');
    if (type != null) {
      this.chosenExerciseType = JSON.parse(type);
    }
      if(this.chosenExerciseType){
        this.exerciseService.findAllExercisesByType({
          type: this.chosenExerciseType
        }).subscribe({
          next: (res) => {
            this.exercises = res;
            this.findRecordForExercise();

          }
        })
      }
  }


  getFormattedType(type?: string): string {
    if (!type) return '';
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  }




  displayRecords(types: "CHEST" | "SHOULDERS" | "BICEPS" | "TRICEPS" | "FOREARM" |"TRAPS" | "LATS" | "MIDDLE_BACK" | "LOW_BACK" | "ABS" | "QUADRICEPS" | "GLUTES" | "ABDUCTORS" | "ADDUCTORS" | "HAMSTRINGS" | "CALF" | undefined) {
    localStorage.setItem('type', JSON.stringify(types));
    window.location.reload();
  }

  findRecordForExercise(){
    this.exercises.forEach((exercise) => {
      if (exercise.id != null) {
        this.workoutLogsService.findAllRecordByExerciseId({ id: exercise.id })
          .subscribe({
            next: (res) => {
              this.exerciseRecords[exercise.id as number] = res;
            },
            error: (err) => {
              console.error(`Error for exercise ${exercise.id}:`, err);
            }
          });
      }
    });
  }



}
