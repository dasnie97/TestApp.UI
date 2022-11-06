import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.RenderChart();
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


  RenderChart()
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

    const myChart = new Chart("FPYChart", config);
  }
}
