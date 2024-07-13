import {Component, OnInit} from '@angular/core';
import {ExerciseResponse} from "../../../../services/models/exercise-response";
import {ExerciseControllerService} from "../../../../services/services/exercise-controller.service";
import {PlanExerciseControllerService} from "../../../../services/services/plan-exercise-controller.service";
import {PlanExerciseRequest} from "../../../../services/models/plan-exercise-request";
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanRequest} from "../../../../services/models/plan-request";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseRequest} from "../../../../services/models/exercise-request";


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

  selectedSet: number = 0;

  selectedCreatedExercise = false;
  newExerciseName: string | undefined;



  constructor(
    private exerciseService: ExerciseControllerService,
    private planExerciseService: PlanExerciseControllerService,
    private planService: PlanControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const trainingId = this.activatedRoute.snapshot.params['trainingId'];
    if(trainingId){
      this.editTraining(trainingId);
    }else {
      this.findAllExercises();
      this.findAllAddedExercises();
    }
  }

  createTraining() {
    if (!this.activatedRoute.snapshot.params['trainingId']) {
      if (this.unsavedExercises?.length == 0) {
        this.message = "Add exercises first";
      } else if (this.trainingName && this.unsavedExercises) {

        const planRequest: PlanRequest = {
          name: this.trainingName,
          planExerciseIds: this.unsavedExercises
            .map(exercise => exercise.id)
            .filter(id => id !== undefined) as number[]
        };
        this.planService.save1({
          body: planRequest
        }).subscribe({
          next: () => {
            // this.setWorkout();
            this.router.navigate(['training-plans']);
          }
        });
      } else{
        this.message = "Name cannot be empty";
      }
    }else {
      this.router.navigate(['training-plans']);
    }
  }

  // setWorkout(){
  //   this.planExerciseService.setWorkoutPlan().subscribe({
  //     next: () => {
  //       this.router.navigate(['training-plans']);
  //     }
  //   })
  // }

  onExerciseClick(exercise: ExerciseResponse) {
    this.selectedExercise = exercise;
  }

  editTraining(id: number){
    this.planService.findPlanById({
      plan_id: id
    }).subscribe({
      next: (training) => {
        this.trainingName = training.name;

        this.planService.findAllExercisesByTrainingId({
          plan_id: id
        }).subscribe({
          next: ( exerciseResponse) => {
            this.unsavedExercises = exerciseResponse;
          }
        })
      }
    })
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
    if( this.selectedExercise && this.selectedSet > 0 && this.selectedExercise.id ){
      const planExerciseRequest: PlanExerciseRequest = {
        exerciseId: this.selectedExercise.id,
        sets: this.selectedSet
      };
      const trainingId = this.activatedRoute.snapshot.params['trainingId'];
      if(trainingId){
        this.planExerciseService.savePlanExerciseForSpecificWorkout({
          body: planExerciseRequest,
          id: trainingId
        }).subscribe({
          next: () => {
            this.editTraining(trainingId);
          }
        })
      }else {
        this.planExerciseService.savePlanExercise({
          body: planExerciseRequest
        }).subscribe({
          next: () => {
            this.findAllAddedExercises();
            this.selectedExercise = undefined;
            this.message = undefined;
          }
        })
      }
      }else {
        this.message = this.selectedSet === 0 ? "Sets cannot be 0" : "First choose your exercise";
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

  createExercise() {
    this.selectedCreatedExercise = !this.selectedCreatedExercise;
  }

  deletePlanExercise(id: number | undefined) {
      this.planExerciseService.deletePlanExercise({
        id: id as number
      }).subscribe(
        () => {
          const trainingId = this.activatedRoute.snapshot.params['trainingId'];
          if(trainingId){
            this.editTraining(trainingId);
          }else {
            this.findAllAddedExercises();
          }
        }
      )
  }

  createNewExercise() {
    if(this.newExerciseName == null){
      this.message = "Name cannot be empty";
      return;
    }
    if(this.newExerciseName && this.selectedType){
      const exerciseRequest: ExerciseRequest ={
        name: this.newExerciseName,
        exerciseType: this.selectedType
      };
      this.exerciseService.saveExercise({
        body: exerciseRequest
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      });
    }
  }

  deleteExercise(id: number | undefined) {
      this.exerciseService.deletePlanExercise1({
        id: id as number
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
