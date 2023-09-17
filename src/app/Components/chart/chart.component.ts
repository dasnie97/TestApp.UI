import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartConfiguration, ChartTypeRegistry, TooltipItem, ChartType} from 'chart.js';
import { YieldPoint } from 'src/app/Models/yield-point.model';
import { TestReportService } from 'src/app/Services/testreport.service';
import * as moment from 'moment';
import { WorkstationService } from 'src/app/Services/workstation.service';
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

  constructor(private TestReportService:TestReportService, private WorkstationService:WorkstationService) { }

  workstations: any[] = [];
  filters:{key:string, value:string[]}[]=[
    {key:"workstation", value:[]},
    {key:"dateFrom", value:[]},
    {key:"dateTo", value:[]},
  ];
  fromDateTime:moment.Moment = moment().subtract(1, 'days');
  toDateTime:moment.Moment = moment(null);

  ngOnInit(): void {

    this.WorkstationService.getWorkstations().subscribe(
      {
        next:(workstations)=>
        {
          this.workstations = workstations;
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
    )

    this.RenderChart();
    this.filters[1].value = [this.fromDateTime.utcOffset(0, true).format()];
    this.fetchYieldPoints();
  }

  workstationFilterChange(evt:any)
  {
    this.filters.forEach(filter => {
      if (filter.key == "workstation")
      {
        filter.value = evt;
      }
    });
  }

  fromDateTimeChange(dateTime:moment.Moment)
  {
    this.fromDateTime = dateTime;
    this.filters.forEach(filter => {
      if (filter.key == "dateFrom")
      {
        if (dateTime == null)
        {
          filter.value = [];
        }
        else
        {
          filter.value = [dateTime.utcOffset(0, true).format()];
        }
      }
    });
  }

  toDateTimeChange(dateTime:moment.Moment)
  {
    this.toDateTime = dateTime;
    this.filters.forEach(filter => {
      if (filter.key == "dateTo")
      {
        if (dateTime == null)
        {
          filter.value = [];
        }
        else
        {
          filter.value = [dateTime.utcOffset(0, true).format()];
        }
      }
    });
  }

  fetchYieldPoints()
  {
    this.TestReportService.getYieldPoints(this.filters).subscribe(
      {
        next:(yieldPoints)=>{
          this.UpdateChart(yieldPoints);
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

  RenderChart()
  {
    const data = {
      datasets: [],
    };

    const chartType: keyof ChartTypeRegistry = 'line';

     
    interface CustomTooltipItem extends TooltipItem<ChartType> {
      raw: {
        x: string,
        y: number,
        total: string,
        passed: string,
        failed: string
      }
    };

    const config: ChartConfiguration<keyof ChartTypeRegistry> = {
      type: chartType,
      data: data,
      options: {
        plugins:{
          tooltip:{
            callbacks:{
              label: (context: CustomTooltipItem) => {

                var text = [context.dataset.label + ': ' + context.raw.y.toFixed(1) + '%'];
                text.push('Total: ' + context.raw.total);
                text.push('Passed: ' + context.raw.passed);
                text.push('Failed: ' + context.raw.failed);

                return text;

                }
              }
            }
          },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 50,
            suggestedMax: 100,
          },
          x: {
            ticks: {
              maxRotation: 0
            },
          },
        },
      },
    };

    const FPYChart = new Chart("FPYChart", config);
  }

  UpdateChart(yieldPoints:{[workstation:string]:YieldPoint[]})
  {
    var color = 0;
    var chart = Chart.getChart("FPYChart");
    chart?.destroy();
    this.RenderChart();
    chart = Chart.getChart("FPYChart");
    
    for (let [TesterName, DataSet] of Object.entries(yieldPoints)) {
      const newDataset = {
        label: TesterName,
        backgroundColor: this.COLORS[color],
        borderColor: this.COLORS[color],
        data: new Array(),
      };
  
      DataSet.forEach(yP => {

        var formattedDate = new Date(yP.dateAndTime).toLocaleString('pl-PL', {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        if (yP.yield != null) {
          newDataset.data.push({ x: formattedDate, y: yP.yield * 100 , total: yP.total, passed: yP.passed, failed: yP.failed});
        } else {
          newDataset.data.push({ x: formattedDate, y: null });
        }
      });
  
      chart?.data.datasets.push(newDataset);
      color++;
    }
    chart?.update();
  }
}
