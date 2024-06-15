import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WeightControllerService} from "../../../../services/services/weight-controller.service";
import {WeightResponse} from "../../../../services/models/weight-response";


export interface UserMonth {
  year: number;
  month: number;
}

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit{



  chosenDate: UserMonth | undefined;

  userMonths: UserMonth[] = [];

  weightResponse: WeightResponse[] = [];

  weighResponseForMonth: WeightResponse[] =[];

  chartStyle = "#1B1B1B";
  chartStyle2 = "#2a2929";

  month: string | undefined;


  isCliked = false;


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
    console.log(this.userMonths.length);
    if(this.userMonths.length > 0) {
      this.getWeightForSpecificMonth();
    }
  }

  createWeight() {
    this.isCliked = !this.isCliked;
  }

  addWeight() {

  }
}
