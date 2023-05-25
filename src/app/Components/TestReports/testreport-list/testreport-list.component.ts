import { Component, OnInit } from '@angular/core';
import { TestReport } from 'src/app/Models/testreport.model';
import { TestReportService } from 'src/app/Services/testreport.service';
import * as moment from 'moment';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-testreport-list',
  templateUrl: './testreport-list.component.html',
  styleUrls: ['./testreport-list.component.css']
})
export class TestReportListComponent implements OnInit {

  constructor(private logfileService:TestReportService) { }

  logfiles: TestReport[] = [];
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
  fromDateTime:moment.Moment = moment().subtract(1, 'days');
  toDateTime:moment.Moment = moment(null);

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
    this.filterResults();
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
    this.logfileService.getFilteredTestReports(this.filters).subscribe(
      {
        next:(logfiles)=>{
          this.logfiles = logfiles.sort((a, b) => a.recordCreated.valueOf() - b.recordCreated.valueOf());
        },
        error:(response)=>{
          console.log(response);
        }
      }
    )

    setTimeout(this.filterResults.bind(this), 10000);
    }

    getTableRowColor(item: TestReport): string {
      if (item.status == "Passed") {
        return 'tableRow-passed';
      } else {
        return 'tableRow-failed';
      }
    }
}
