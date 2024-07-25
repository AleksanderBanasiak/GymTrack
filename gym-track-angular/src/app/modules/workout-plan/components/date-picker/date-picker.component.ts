import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WorkoutSessionControllerService } from '../../../../services/services/workout-session-controller.service';
import { WorkoutSessionResponse } from '../../../../services/models/workout-session-response';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  monthName: string | undefined;
  daysInMonth: (number | null)[] = [];
  firstDayOfWeek: number = 0;
  highlightedDays: number[] = [];

  sessions: WorkoutSessionResponse[] = [];

  constructor(
      private datePipe: DatePipe,
      private workoutSessionService: WorkoutSessionControllerService
  ) { }

  ngOnInit(): void {
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.loadSessionsAndUpdateCalendar();
  }

  private loadSessionsAndUpdateCalendar(){
    this.workoutSessionService.findAllSessionsByMonth({
      "month-id": this.selectedDate.getMonth() +1,
      "year-id": this.selectedDate.getFullYear()
    }).subscribe({
      next: (res) => {
        this.sessions = res;
        this.updateHighlightedDays();
        this.updateCalendar();
      }
    });
  }

  private updateHighlightedDays() {
    const daysSet = new Set<number>();
    this.sessions.forEach(session => {
      if (session.sessionDate) {
        const sessionDate = new Date(session.sessionDate);
        if (!isNaN(sessionDate.getTime())) {
          const day = sessionDate.getDate();
          daysSet.add(day);
        }
      }
    });
    this.highlightedDays = Array.from(daysSet);
  }

  updateCalendar() {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();

    this.monthName = this.datePipe.transform(this.selectedDate, 'MMMM yyyy') || '';

    if (this.monthName) {
      const numDaysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      this.firstDayOfWeek = firstDay === 0 ? 6 : firstDay - 1;
      this.daysInMonth = Array(this.firstDayOfWeek).fill(null).concat(Array.from({ length: numDaysInMonth }, (_, i) => i + 1));
    }
  }

  goToPreviousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.loadSessionsAndUpdateCalendar();
  }

  goToNextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.loadSessionsAndUpdateCalendar();
  }

  isCurrentDay(day: number): boolean {
    return this.currentDate.getDate() === day &&
        this.currentDate.getMonth() === this.selectedDate.getMonth() &&
        this.currentDate.getFullYear() === this.selectedDate.getFullYear();
  }
}
