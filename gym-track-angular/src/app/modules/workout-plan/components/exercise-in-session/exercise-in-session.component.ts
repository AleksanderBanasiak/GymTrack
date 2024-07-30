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
import {NotesRequest} from "../../../../services/models/notes-request";
import {NotesControllerService} from "../../../../services/services/notes-controller.service";
import {NotesResponse} from "../../../../services/models/notes-response";

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
  lastLogsForExercise: WorkoutLogsResponse[] = [];

  isChecked: boolean = false;
  noteContent: string = '';
  notes: NotesResponse[] =[];

  constructor(private fb: FormBuilder,
              private workoutLogsService: WorkoutLogsControllerService,
              private workoutSessionService: WorkoutSessionControllerService,
              private planService: PlanControllerService,
              private notesService: NotesControllerService,
              private router: Router
  ) {
    this.setsForm.push(this.createSetForm());
  }

  ngOnInit(): void {
    this.findSessionById(this.sessionId as number);

    const savedSessionId = localStorage.getItem('sessionId');
    if (savedSessionId) {
      this.sessionId = JSON.parse(savedSessionId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const savedExercise = localStorage.getItem('chosenPlanExercise');
    if (savedExercise) {
      this.planExercise = JSON.parse(savedExercise);
    }

    if (changes['planExercise'] && this.planExercise?.sets) {
      this.findLastLogsForExercise(this.planExercise.exerciseId as number);
      this.findLogsByExerciseId(this.planExercise.exerciseId as number);
      this.findMaxesByExerciseId(this.planExercise.exerciseId as number);
      this.findHistory(this.planExercise.exerciseId as number, this.sessionId as number);
      this.getAllNotes();
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
      this.saveLogs(setNumber +1, setForm);
  }

  private saveLogs(setNumber: number, form: FormGroup){
    if (form.get('weight')?.value <= 0 || form.get('weight')?.value >= 550 || form.get('reps')?.value <= 0 || form.get('reps')?.value >= 200 || form.get('clicked')?.value == true) {
      window.location.reload();
      return;
    }

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
        form.get('clicked')?.setValue(true);
        window.location.reload();
      }
    })
  }
  private getAllLogsBySessionId(){


    this.workoutLogsService.findAllLogsBySessionIdAndPlanExerciseId({
      "session-id": this.sessionId as number,
      "plan-exercise-id": this.planExercise?.id as number
    }).subscribe({
      next: (res) => {
        this.workoutLogsResponse = res;

        // TODO: probelm jest taki że metoda jest wywoływane tylko po ngCHanges a nie init
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
        let reps = 0;
        let weight = 0;

        if (setsMap.has(i)) {
          const log = setsMap.get(i);
          reps = log?.reps as number;
          weight = log?.weight as number;
        } else if (this.lastLogsForExercise.length > 0) {
          const lastLog = this.lastLogsForExercise[i - 1] || this.lastLogsForExercise[this.lastLogsForExercise.length - 1];
          reps = lastLog.reps as number;
          weight = lastLog.weight as number;
        }

        this.setsForm.push(this.fb.group({
          reps: [reps, Validators.required],
          weight: [weight, Validators.required],
          total: [{ value: reps * weight, disabled: true }],
          clicked: [setsMap.has(i)]
        }));
      }
    }
  }


  private findLastLogsForExercise(id: number){
    this.workoutLogsService.findLastLogsByExerciseIdAndUserId({
      id: id
    }).subscribe({
      next: (res) => {
        this.lastLogsForExercise = res;
        this.getAllLogsBySessionId();
      }
    })
  }

  endTraining() {
    this.workoutSessionService.endSession({
      id: this.sessionId as number
    }).subscribe({
      next: () => {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('chosenPlanExercise');
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

  sessionVolume(index: number): number{
    let volume = 0;

    this.history[index].forEach(item => {
      volume += item.summaryWeight as number
    })
      return volume;
    }


  private getAllNotes(){
    this.notesService.findAllNotesForExercise({
      id: this.planExercise?.exerciseId as number
    }).subscribe({
      next: (res) => {
        this.notes = res;
      }
    })
  }

  deleteNote(i: number | undefined) {
    if(i){
      this.notesService.deleteNotes({
        id: i
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      })
    }
  }

  addNote() {
    this.isChecked = !this.isChecked;
  }

  createNote() {
    if(this.noteContent.length > 0){
      const noteRequest: NotesRequest = {
        exerciseId: this.planExercise?.exerciseId as number,
        note: this.noteContent
      }
      this.notesService.saveNotes({
        body: noteRequest
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      })
    }
  }
}
