import { Component, OnInit } from '@angular/core';
import { LogFile } from 'src/app/Models/logfile.model';
import { LogfilesService } from 'src/app/Services/logfiles.service';
import * as moment from 'moment';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-logfiles-list',
  templateUrl: './logfiles-list.component.html',
  styleUrls: ['./logfiles-list.component.css']
})
export class LogfilesListComponent implements OnInit {

  constructor(private logfileService:LogfilesService) { }

  logfiles: LogFile[] = [];
  workstations: any[] = [];
  filters:{key:string, value:string[]}[]=[
    {key:"workstation", value:[]},
    {key:"serialNumber", value:[]},
    {key:"result", value:[]},
    {key:"dut", value:[]},
    {key:"failure", value:[]},
    {key:"dateFrom", value:[]},
    {key:"dateTo", value:[]},
  ];
  serialNumbers:string = "";
  result:string = "All results";
  DUT:string = "";
  failure:string = "";
  fromDateTime:moment.Moment = moment("20221110", "YYYYMMDD");
  toDateTime:moment.Moment = moment();

  ngOnInit(): void {
    this.logfileService.getAllWorkstations().subscribe(
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

    this.filters[5].value = [this.fromDateTime.utcOffset(0, true).format()];
    this.filters[6].value = [this.toDateTime.utcOffset(0, true).format()];
    
    this.logfileService.getFilteredLogFiles(this.filters).subscribe(
      {
        next:(logfiles)=>{
          this.logfiles = logfiles;
        },
        error:(response)=>{
          console.log(response);
        }
      }
    )
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

  serialNumberFilterChange($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "serialNumber")
      {
        if (this.serialNumbers == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.serialNumbers.trim().split(',');
        }
      }
    });
    }

  resultFilterChanged($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "result")
      {
        if (this.result == "All results")
        {
          filter.value = [];
        }
        else{
          filter.value = [this.result];
        }
      }
    });
    }

  dutFilterChanged($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "dut")
      {
        if (this.DUT == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = this.DUT.trim().split(',');
        }
      }
    });
    }

  failureFilterChanged($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "failure")
      {
        if (this.failure == "")
        {
          filter.value = [];
        }
        else
        {
          filter.value = [this.failure.trim()];
        }
      }
    });
    }

  fromDateTimeChange(dateTime:moment.Moment)
  {
    this.fromDateTime = dateTime;
    this.filters.forEach(filter => {
      if (filter.key == "dateFrom")
      {
        filter.value = [dateTime.utcOffset(0, true).format()];
      }
    });
  }

  toDateTimeChange(dateTime:moment.Moment)
  {
    this.toDateTime = dateTime;
    this.filters.forEach(filter => {
      if (filter.key == "dateTo")
      {
        filter.value = [dateTime.utcOffset(0, true).format()];
      }
    });
  }

  filterResults() {
    this.logfileService.getFilteredLogFiles(this.filters).subscribe(
      {
        next:(logfiles)=>{
          this.logfiles = logfiles;
        },
        error:(response)=>{
          console.log(response);
        }
      }
    )
    }
}
