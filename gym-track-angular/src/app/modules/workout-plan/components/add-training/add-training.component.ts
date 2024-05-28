import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit{

  exerciseResponse: ExerciseResponse[] = [];

  exerciseTypes: ExerciseResponse['type'][] = [
    'CHEST', 'BACK', 'BICEPS', 'SHOULDERS', 'TRICEPS', 'FOREARM', 'ABS', 'GLUTES', 'CALF', 'THIGH', 'HAMSTRINGS'
  ];

  selectedType: ExerciseResponse['type'] = this.exerciseTypes[0];

  selectedExercise: ExerciseResponse | undefined;

  exerciseMap: Map<number, number> = new Map<number, number>();


  selectedSets: number[] = [];
  isSelectFormVisible=false;

  selectedCreatedExercise = false;

  constructor(
    private exerciseService: ExerciseControllerService
  ) {
  }

  createTraining() {

  }
  ngOnInit(): void {
    this.findAllExercises();
    this.selectedSets = [0];
  }

   findAllExercises(): void {
    if (this.selectedType) {
      this.exerciseService.findAllExercisesByType({
        'type': this.selectedType
      }).subscribe({
        next: (exercises: ExerciseResponse[]) => {
          this.exerciseResponse = exercises;
        },
        error: (err) => {
          console.error('Error fetching exercises', err);
        }
      });
    }
  }
  onExerciseChange(event: any) {
    this.selectedExercise = event.target.value;
  }



  addExercise() {
    console.log('Wybrane ćwiczenie:', this.selectedExercise?.id);
    console.log('Liczba serii:', this.selectedSets);
  }

  toggleSelectForm() {
    this.isSelectFormVisible = !this.isSelectFormVisible;
  }

  createExercise() {
    this.selectedCreatedExercise = !this.selectedCreatedExercise;
  }
}
