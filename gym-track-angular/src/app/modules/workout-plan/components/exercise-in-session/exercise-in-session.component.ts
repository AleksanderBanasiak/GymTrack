import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PlanExerciseResponse} from "../../../../services/models/plan-exercise-response";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkoutLogsControllerService} from "../../../../services/services/workout-logs-controller.service";
import {WorkoutLogsRequest} from "../../../../services/models/workout-logs-request";
import {WorkoutLogsResponse} from "../../../../services/models/workout-logs-response";
import {WorkoutSessionControllerService} from "../../../../services/services/workout-session-controller.service";
import {Router} from "@angular/router";
import {PlanControllerService} from "../../../../services/services/plan-controller.service";
import {PlanResponse} from "../../../../services/models/plan-response";

@Component({
  selector: 'app-exercise-in-session',
  templateUrl: './exercise-in-session.component.html',
  styleUrls: ['./exercise-in-session.component.css']
})
export class ExerciseInSessionComponent implements OnInit, OnChanges{


  @Input() planExercise: PlanExerciseResponse | undefined;
  @Input() sessionId: number | undefined;

  setsForm: FormGroup[] = [];
  workoutLogsResponse: WorkoutLogsResponse[] | undefined;
  planResponse: PlanResponse | undefined;

  chartLogs: WorkoutLogsResponse[] = [];
  chartMaxLogs: WorkoutLogsResponse[] = [];
  history: WorkoutLogsResponse[][] = [];


  constructor(private fb: FormBuilder,
              private workoutLogsService: WorkoutLogsControllerService,
              private workoutSessionService: WorkoutSessionControllerService,
              private planService: PlanControllerService,
              private router: Router
  ) {
    this.setsForm.push(this.createSetForm());
  }

  ngOnInit(): void {
    this.getAllLogsBySessionId();
    this.findSessionById(this.sessionId as number);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planExercise'] && this.planExercise?.sets) {
      this.getAllLogsBySessionId();
      this.findLogsByExerciseId(this.planExercise.exerciseId as number);
      this.findMaxesByExerciseId(this.planExercise.exerciseId as number);
      this.findHistory(this.planExercise.exerciseId as number, this.sessionId as number);

    }
  }



  createSetForm(): FormGroup {
    return this.fb.group({
      reps: [0, Validators.required],
      weight: [0, Validators.required],
      total: [{ value: 0, disabled: true }],
      clicked: [false]
    });
  }

  calculateTotal(setForm: FormGroup): void {
    const reps = setForm.get('reps')?.value;
    const weight = setForm.get('weight')?.value;
    setForm.get('total')?.setValue(reps * weight);
  }

  onSubmit(setForm: FormGroup, setNumber: number) {
    setForm.get('clicked')?.setValue(true);
    this.saveLogs(setNumber +1, setForm)
  }

  private saveLogs(setNumber: number, form: FormGroup){

    const workoutLogsRequest: WorkoutLogsRequest ={
      reps: form.get('reps')?.value as number,
      setNumber: setNumber,
      weight: form.get('weight')?.value as number,
      workoutSessionId: this.sessionId as number,
      planExerciseId: this.planExercise?.id as number
  }
    this.workoutLogsService.save({
      body: workoutLogsRequest
    }).subscribe({
      next: () => {
        window.location.reload();
      }
    })
  }


  private getAllLogsBySessionId(){
    this.workoutLogsService.findAllLogsBySessionId({
      id: this.sessionId as number
    }).subscribe({
      next: (res) => {
        this.workoutLogsResponse = res;
        this.initializeFormsWithLogs(res);
    }
    })
  }

  private findSessionById(id: number){
    this.workoutSessionService.findSessionById({
      id: id
    }).subscribe({
      next: (res) => {
        this.findPlanById(res.planId as number);
      }
    })
  }


  private initializeFormsWithLogs(logs: WorkoutLogsResponse[]): void {
    this.setsForm = [];

    const setsMap = new Map<number, WorkoutLogsResponse>();
    logs.forEach(log => {
      if (log.exerciseId === this.planExercise?.id) {
        setsMap.set(log.setNumber as number, log);
      }
    });

    if (this.planExercise?.sets) {
      for (let i = 1; i <= this.planExercise.sets; i++) {
        if (setsMap.has(i)) {
          const log = setsMap.get(i);
          const reps = log?.reps as number;
          const weight = log?.weight as number;

          this.setsForm.push(this.fb.group({

            reps: [log?.reps, Validators.required],
            weight: [log?.weight, Validators.required],
            total: [{ value: reps * weight, disabled: true }],
            clicked: [true]
          }));
        } else {
          this.setsForm.push(this.createSetForm());
        }
      }
    }
  }


  endTraining() {
    this.workoutSessionService.endSession({
      id: this.sessionId as number
    }).subscribe({
      next: () => {
        this.router.navigate(['']);
      }
    })
  }

  private findPlanById(id: number){
    this.planService.findPlanById({
      plan_id: id
    }).subscribe({
      next: (res) => {
        this.planResponse = res;
        // console.log(this.planResponse);
      }
    })
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
  private findHistory(exerciseId: number, sessionId: number) {
      this.workoutLogsService.findAllLogsByExerciseIdAndUserIdGroupedBySessionId({
        "exercise-id": exerciseId,
        "session-id": sessionId
      }).subscribe({
        next: (res) => {
          this.history = res;
        }
      })
    }


}
