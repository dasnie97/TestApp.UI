import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { YieldPoint } from 'src/app/Models/yield-point.model';
import { TestReportService } from 'src/app/Services/testreport.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  yp:YieldPoint[]=[
    {
      dateAndTime:new Date(),
      yield:0,
      total:0,
      passed:0,
      failed:0
    }
  ]
  yieldPointsBuffor:{[workstation:string]:YieldPoint[]}={
    "husqv": this.yp,
  };

  constructor(private TestReportService:TestReportService) { }

  ngOnInit(): void {

    this.TestReportService.getYieldPoints().subscribe(
      {
        next:(yieldPoints)=>{
          this.RenderChart(yieldPoints);
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
    );
  }

  COLORS = [
    "#006400",
    "#00008b",
    "#b03060",
    "#ff4500",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#ff00ff",
    "#6495ed",
    "#ffdead",
  ];

  RenderChart(yieldPoints:{[workstation:string]:YieldPoint[]})
  {
    const data = {
      datasets: [],
    };
  
    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            suggestedMin: 90,
            suggestedMax: 100,
          },
          x: {
            ticks: {
              maxRotation: 0,
            },
          },
        },
      },
    };

    const FPYChart = new Chart("FPYChart", config);

    var color = 0;
    
    for (let [TesterName, DataSet] of Object.entries(yieldPoints)) {
      const newDataset = {
        label: TesterName,
        backgroundColor: this.COLORS[color],
        borderColor: this.COLORS[color],
        data: new Array(),
      };
  
      DataSet.forEach(yP => {
        if (yP.yield != null) {
          newDataset.data.push({ x: yP.dateAndTime, y: yP.yield * 100 });
        } else {
          newDataset.data.push({ x: yP.dateAndTime, y: null });
        }
      });
  
      FPYChart.data.datasets.push(newDataset);
      color++;
    }
    FPYChart.update();
  }
}
