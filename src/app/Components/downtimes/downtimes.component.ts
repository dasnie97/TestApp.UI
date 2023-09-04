import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import * as moment from 'moment';
import { DowntimeReport } from 'src/app/Models/downtimereport.model';
import { DowntimereportService } from 'src/app/Services/downtimereport.service';

@Component({
  selector: 'app-downtimes',
  templateUrl: './downtimes.component.html',
  styleUrls: ['./downtimes.component.css'],
})
export class DowntimesComponent implements OnInit {

  constructor(private DowntimeReportService:DowntimereportService) {
  }

  downtimeReports: DowntimeReport[] = [];
  sortedReports: DowntimeReport[] = [];

  filters:{key:string, value:string[]}[]=[
    {key:"problemDescription", value:[]},
    {key:"actionTaken", value:[]},
    {key:"technician", value:[]},
    {key:"workstation", value:[]},
    {key:"operator", value:[]},
    {key:"dateFrom", value:[]},
    {key:"dateTo", value:[]},
    {key:"totalDowntime", value:[]}
  ];

  problemDescriptions:string = "";
  actionsTaken:string = "";
  technicians:string = "";
  testers:string = "";
  operators:string = "";
  timeStartedFrom:moment.Moment = moment().subtract(1, 'days');
  timeFinishedTo:moment.Moment = moment(null);

  ngOnInit(): void {
    this.filters[5].value = [this.timeStartedFrom.utcOffset(0, true).format()];
    this.filterResults();
  }

  filterResults(){
    this.DowntimeReportService.getFilteredDowntimeReports(this.filters).subscribe(
      {
        next:(downtimeReports)=>
        {
          console.log(this.filters);
          this.downtimeReports = downtimeReports;
          this.sortedReports = this.downtimeReports.slice();
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
      )
  }

  problemDescriptionFilterChange($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "problemDescription")
      {
        if (this.problemDescriptions == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.problemDescriptions.trim().split(',');
        }
      }
    });
    }

  actionTakenFilterChange($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "actionTaken")
      {
        if (this.actionsTaken == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.actionsTaken.trim().split(',');
        }
      }
    });
    }

  technicianFilterChange($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "technician")
      {
        if (this.technicians == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.technicians.trim().split(',');
        }
      }
    });
    }

  testerFilterChange($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "workstation")
      {
        if (this.testers == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.testers.trim().split(',');
        }
      }
    });
    }

  operatorFilterChange($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "operator")
      {
        if (this.operators == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.operators.trim().split(',');
        }
      }
    });
    }

  timeStartedFromFilterChange(dateTime:moment.Moment)
    {
      this.timeStartedFrom = dateTime;
      this.filters.forEach(filter => {
        if (filter.key == "dateFrom")
        {
          filter.value = [dateTime.utcOffset(0, true).format()];
        }
      });
    }

  timeFinishedToFilterChange(dateTime:moment.Moment)
    {
      this.timeFinishedTo = dateTime;
      this.filters.forEach(filter => {
        if (filter.key == "dateTo")
        {
          filter.value = [dateTime.utcOffset(0, true).format()];
        }
      });
    }

    sortData(sort: Sort) {
      const data = this.downtimeReports.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedReports = data;
        return;
      }

      this.sortedReports = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'time':
            return compare(a.totalDowntime.valueOf(), b.totalDowntime.valueOf(), isAsc);
          default:
            return 0;
        }
      });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}