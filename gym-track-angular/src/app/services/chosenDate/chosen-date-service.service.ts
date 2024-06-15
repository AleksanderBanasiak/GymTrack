import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserMonth} from "../../modules/workout-plan/components/weight/weight.component";

@Injectable({
  providedIn: 'root'
})
export class ChosenDateServiceService {
  private chosenDateSubject = new BehaviorSubject<UserMonth | undefined>(undefined);
  chosenDate$ = this.chosenDateSubject.asObservable();

  setChosenDate(chosenDate: UserMonth) {
    this.chosenDateSubject.next(chosenDate);
  }
}
