import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {PlanExerciseControllerService} from "../../../../services/services/plan-exercise-controller.service";
import {PlanExerciseRequest} from "../../../../services/models/plan-exercise-request";
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanRequest} from "../../../../services/models/plan-request";
import {Router} from "@angular/router";
import {ExerciseRequest} from "../../../../services/models/exercise-request";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";


@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit{

  exerciseResponse: ExerciseResponse[] = [];

  userExerciseResponse: ExerciseResponse[] = [];

  exerciseTypes: ExerciseResponse['type'][] = [
    'CHEST', 'BACK', 'BICEPS', 'SHOULDERS', 'TRICEPS', 'FOREARM', 'ABS', 'GLUTES', 'CALF', 'THIGH', 'HAMSTRINGS'
  ];

  selectedType: ExerciseResponse['type'] = this.exerciseTypes[0];

  selectedExercise: ExerciseResponse | undefined;

  unsavedExercises: PlanExerciseResponse[] | undefined;

  message: string | undefined;

  trainingName: string | undefined;

  selectedSets: number[] = [];
  isSelectFormVisible=false;

  selectedCreatedExercise = false;
  newExerciseName: string | undefined;



  constructor(
    private exerciseService: ExerciseControllerService,
    private planExerciseService: PlanExerciseControllerService,
    private planService: PlanControllerService,
    private router: Router
  ) {
  }

  createTraining() {
    if(this.unsavedExercises?.length == 0) {
      this.message = "Add exercises first";
    }
    else if(this.trainingName && this.unsavedExercises){
      const planRequest: PlanRequest = {
        name: this.trainingName,
        planExerciseResponses: this.unsavedExercises
      }
      this.planService.save({
        body: planRequest
      }).subscribe({
        next: (response) => {
          this.setWorkout();
        }
      })
    }else if(this.trainingName == null) {
      this.message = "Name cannot be empty";
    }
  }




  setWorkout(){
    this.planExerciseService.setWorkoutPlan().subscribe({
      next: () => {
        this.router.navigate(['training-plans']);
      }
    })
  }


  onExerciseClick(exercise: ExerciseResponse) {
    this.selectedExercise = exercise;
  }



  ngOnInit(): void {
    this.findAllExercises();
    this.selectedSets = [0];
    this.findAllAddedExercises();
  }

   findAllExercises(): void {
    if (this.selectedType) {
      this.exerciseService.findAllExercisesByType({
        'type': this.selectedType
      }).subscribe({
        next: (exercises: ExerciseResponse[]) => {
          this.exerciseResponse = exercises;
          this.findAllUserExercises();
        }
      });
    }
  }

  getMatchingUserExercise(exerciseId: number | undefined) {
    return this.userExerciseResponse.find(usr => usr.id === exerciseId);
  }

  findAllUserExercises(){
    if (this.selectedType) {
      this.exerciseService.findAllUserExercisesByType({
        'type': this.selectedType
      }).subscribe({
        next: (exercises: ExerciseResponse[]) => {
          this.userExerciseResponse = exercises;
        }

      });
    }
  }



  addExercise() {
    if( this.selectedExercise && this.selectedSets){
      const planExerciseRequest: PlanExerciseRequest = {
        exercise: this.selectedExercise,
        sets: this.selectedSets[0]
      };
        this.planExerciseService.savePlanExercise({
          body: planExerciseRequest
        }).subscribe({
          next: () => {
            this.findAllAddedExercises();
            this.selectedExercise = undefined;
            this.message = undefined;
          }
        })
      }else {
      if(this.selectedSets[0] == 0){
        this.message = "Sets cannot be 0";
      }
      else if(this.selectedExercise == null){
        this.message = "First choose your exercise";
      }
    }
  }

  findAllAddedExercises(){
    this.planExerciseService.getAllPlanExerciseWithoutPlan().subscribe({
      next: (planExercises) => {
        this.unsavedExercises = planExercises;
      }, error: (err) => {
        console.log(err.error);
      }
    })
  }


  toggleSelectForm() {
    this.isSelectFormVisible = !this.isSelectFormVisible;
  }

  createExercise() {
    this.selectedCreatedExercise = !this.selectedCreatedExercise;
  }



  deletePlanExercise(id: number | undefined) {
    if(id){
      this.planExerciseService.deletePlanExercise({
        id: id
      }).subscribe(
        () => {
          this.findAllAddedExercises();
        }
      )
    }

  }

  createNewExercise() {

    if(this.newExerciseName == null){
      this.message = "Name cannot be empty";
    }
    else if(this.newExerciseName && this.selectedType){
      const exerciseRequest: ExerciseRequest ={
        name: this.newExerciseName,
        type: this.selectedType
      }

      this.exerciseService.saveExercise({
        body: exerciseRequest
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      })
    }

  }

  deleteExercise(id: number | undefined) {
    if(id){
      this.exerciseService.deletePlanExercise1({
        id: id
      }).subscribe({
        next: () => {
          this.findAllExercises();
        },
        error: (err) => {
          this.message = "This exercise is in plan";
        }
      })
    }
  }
}
