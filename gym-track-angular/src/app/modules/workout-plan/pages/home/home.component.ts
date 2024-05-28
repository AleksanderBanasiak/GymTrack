import {Component, OnInit} from '@angular/core';
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {ExerciseResponse} from "../../../../services/models/exercise-response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  exerciseResponse: ExerciseResponse[] = [];

  constructor(private exerciseService: ExerciseControllerService) {}

  ngOnInit(): void {
    this.findAllExercises();


  }

  private findAllExercises(): void {
    this.exerciseService.findAllUserExercises().subscribe({
      next: (exercises: ExerciseResponse[]) => {
        this.exerciseResponse = exercises;
      },
      error: (err) => {
        console.error('Error fetching exercises', err);
      }
    });
  }




}
