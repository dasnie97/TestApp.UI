import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { DowntimeReport } from 'src/app/Models/downtimereport.model';
import { DowntimereportService } from 'src/app/Services/downtimereport.service';
import {listAnimation} from 'src/app/Models/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddDowntimeComponent } from '../add-downtime/add-downtime.component';
import * as moment from 'moment';

@Component({
  selector: 'app-downtimes',
  templateUrl: './downtimes.component.html',
  styleUrls: ['./downtimes.component.css'],
  animations: [
    listAnimation
]})


export class DowntimesComponent implements OnInit {

  constructor(private DowntimeReportService:DowntimereportService, private _dialog: MatDialog) {
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
  timeStarted:moment.Moment = moment().subtract(1, "day");
  timeFinished:moment.Moment = moment(null);

  ngOnInit(): void {
    this.filters[5].value = [this.timeStarted.utcOffset(0, true).format()];
    this.filterResults();
  }

  filterResults(){
    this.sortedReports = [];
    this.DowntimeReportService.getFilteredDowntimeReports(this.filters).subscribe(
      {
        next:(downtimeReports)=>
        {
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

  timeStartedFilterChange(dateTime:moment.Moment)
    {
      this.timeStarted = dateTime;
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

  timeFinishedFilterChange(dateTime:moment.Moment)
    {
      this.timeFinished = dateTime;
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

    openAddEditDowntimeForm(){
      const dialogRef = this._dialog.open(AddDowntimeComponent);

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.filterResults();
          }
        }
      })
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
