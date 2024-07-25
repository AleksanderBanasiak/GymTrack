import {Component, Input, OnChanges} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import theme from 'highcharts/themes/dark-unica';
import {WeightResponse} from "../../../../services/models/weight-response";
import {formatDate} from "@angular/common";
import {WorkoutLogsResponse} from "../../../../services/models/workout-logs-response";

theme(Highcharts);

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnChanges{


  @Input() weightResponse: WeightResponse[] = [];

  @Input() exercise: WorkoutLogsResponse[] = [];
  @Input() exerciseMax: WorkoutLogsResponse[] = [];
  @Input() chartStyle: string | undefined;

  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;


  ngOnChanges() {
    if (this.weightResponse && this.weightResponse.length > 0) {
      this.getLineChart();
    }

    if(this.exercise && this.exercise.length > 0){
      this.getLineChartForExercise();
    }
    else {
      this.emptyChart();
    }

    if(this.exerciseMax && this.exerciseMax.length > 0){
      this.getLineChartMax();
    }

  }

  getLineChartForExercise() {

    const categories = this.exercise.map(weight => weight.sessionDate);
    const data = this.exercise.map(weight => weight.summaryWeight);

    const weights = this.exercise.map(item => item.weight !== undefined ? item.weight.toString() : '');
    const reps = this.exercise.map(item => item.reps !== undefined ? item.reps.toString() : '');

    const info: string[] = [];

    for (let i = 0; i < weights.length; i++) {
      info.push(`= ${weights[i]}kg x ${reps[i]} reps`);
    }
    let backgroundColor = '#1B1B1B';

    this.chartOptions = {
      chart: {
        type : 'spline',
        backgroundColor: backgroundColor,
      },
      title:{
        text: ''
      },
      xAxis: {
        categories: categories ,
        type: 'datetime',
        labels: {
          formatter: function (this: any) : string {
            return formatDate(new Date(this.value), 'd MMM', 'en-US') ;
          }
        }
      },
      yAxis:{
        title:{
          text:''
        }
      },
      tooltip:{
        valueSuffix:'',
        formatter: function (this: any) : string {
          const index = this.point.index;
          return `<b style="color: #f11f1f">${formatDate(new Date(this.x), 'd MMM yyyy', 'en-US')}</b><br/>${this.series.name}: ${this.y}kg${info[index]}`;
        }
      },
      credits:{
        enabled:false
      },
      navigator:{
        enabled:false
      },
      rangeSelector:{
        enabled:false
      },
      scrollbar:{
        enabled:false
      },
      series: [{
        name: "Weight",
        data: data,
        color: '#f11f1f',
      }],
    }
  }

  private getLineChartMax() {
    const categories = this.exerciseMax.map(weight => weight.sessionDate);
    const data = this.exerciseMax.map(weight => weight.weight);

    let backgroundColor = '#1B1B1B';
    if(this.chartStyle){
      backgroundColor = this.chartStyle;
    }

    this.chartBuilder(categories, data, backgroundColor);

  }

  private chartBuilder(categories: (string | undefined)[], data: (number | undefined)[], backgroundColor: string | undefined){
    this.chartOptions = {
      chart: {
        type : 'spline',
        backgroundColor: backgroundColor,
      },
      title:{
        text: ''
      },
      xAxis: {
        categories: categories ,
        type: 'datetime',
        labels: {
          formatter: function (this: any) : string {
            return formatDate(new Date(this.value), 'd MMM', 'en-US') ;
          }
        }
      },
      yAxis:{
        title:{
          text:''
        }
      },
      tooltip:{
        valueSuffix:'kg'
      },
      credits:{
        enabled:false
      },
      navigator:{
        enabled:false
      },
      rangeSelector:{
        enabled:false
      },
      scrollbar:{
        enabled:false
      },
      series: [{
        name: "Weight",
        data: data,
        color: '#f11f1f',
      }],
    }
  }


  getLineChart(){
    const categories = this.weightResponse.map(weight => weight.date);
    const data = this.weightResponse.map(weight => weight.weight);

    let backgroundColor = '#1B1B1B';
    if(this.chartStyle){
      backgroundColor = this.chartStyle;
    }
    this.chartBuilder(categories, data, backgroundColor);
  }

  private emptyChart(){

  }
}
