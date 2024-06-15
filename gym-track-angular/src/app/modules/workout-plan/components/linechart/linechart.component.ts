import {Component, Input, OnChanges} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import theme from 'highcharts/themes/dark-unica';
import {WeightResponse} from "../../../../services/models/weight-response";
import {formatDate} from "@angular/common";

theme(Highcharts);

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnChanges{


  @Input() weightResponse: WeightResponse[] = [];
  @Input() chartStyle: string | undefined;

  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;



  ngOnChanges() {
    if (this.weightResponse && this.weightResponse.length > 0) {
      this.getLineChart();
    }
  }






  getLineChart(){
    const categories = this.weightResponse.map(weight => weight.date);
    const data = this.weightResponse.map(weight => weight.weight);
    let backgroundColor = '#1B1B1B';
    if(this.chartStyle){
      backgroundColor = this.chartStyle;
    }
    this.chartOptions = {
      chart: {
        type : 'spline',
        backgroundColor: backgroundColor,
      },
      title:{
        text: ''
      },
      xAxis: {
        categories: categories,
        type: 'datetime',
        labels: {
          formatter: function (this: any) : string {
            return formatDate(new Date(this.value), 'd MMM', 'en-US');
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
        name: 'Weight',
        data: data,
        color: '#f11f1f',
      }],
    }
  }





}
