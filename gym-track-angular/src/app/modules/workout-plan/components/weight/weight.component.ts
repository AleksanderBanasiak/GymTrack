import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WeightControllerService} from "../../../../services/services/weight-controller.service";
import {WeightResponse} from "../../../../services/models/weight-response";
import {WeightRequest} from "../../../../services/models/weight-request";
import {animate, state, style, transition, trigger} from "@angular/animations";


export interface UserMonth {
  year: number;
  month: number;
}

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: '100%',
        opacity: 1
      })),
      state('out', style({
        width: '0%',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('in <=> out', animate('0.6s ease-in-out')),
    ])
  ]
})
export class WeightComponent implements OnInit{



  chosenDate: UserMonth | undefined;

  userMonths: UserMonth[] = [];

  weightResponse: WeightResponse[] = [];

  weighResponseForMonth: WeightResponse[] =[];

  chartStyle2 = "#2a2929";

  month: string | undefined;
  isClicked = false;
  message: string | undefined;


  selectedDate ="";
  selectedWeight: number | undefined;


  constructor(
    private weightService: WeightControllerService
  ) {
  }

  ngOnInit(): void {
    this.getMonths();
    this.getWeight();
  }


  setMonth(){
    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthIndex = this.chosenDate?.month || 0;

    this.month = months[monthIndex - 1];
  }


  private getMonths() {
    this.weightService.getUserMonths().subscribe({
      next: (res: string[]) => {
        this.userMonths = res.map(dateStr => {
          const [year, month] = dateStr.split('-').map(Number);
          return { year, month } as UserMonth;
        });
        if(this.userMonths.length >0) {
          this.chosenDate = this.userMonths[this.userMonths.length-1];
          this.getWeightForSpecificMonth();
        }
      }
    });
  }

  private getWeight(){
    this.weightService.getAllUserWeight().subscribe({
      next: (res) => {
        this.weightResponse = res;
      }
    })
  }

  private getWeightForSpecificMonth(){
    this.weightService.getUserWeightMonthly({
      year: this.chosenDate?.year as number,
      month: this.chosenDate?.month as number
    }).subscribe({
      next: (res) => {
        this.weighResponseForMonth = res;
        this.setMonth();
      }
    })
  }


  onChosenDateChange(selectedDate: UserMonth) {
    if(this.userMonths.length > 0) {
      this.getWeightForSpecificMonth();
    }
  }

  createWeight() {
    this.isClicked = !this.isClicked;
  }

  addWeight() {
    if (this.selectedWeight === undefined) {
      this.message = "Add weight first";
      return;
    }

    if (this.selectedWeight <= 0 || this.selectedWeight >= 250) {
      this.message = "Invalid data";
      return;
    }

    if (this.selectedDate === "") {
      this.message = "Select date first";
      return;
    }

      const weightRequest: WeightRequest ={
        date: this.selectedDate,
        weight: this.selectedWeight
      }
      this.weightService.saveWeight({
        body: weightRequest
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      })

  }
}
