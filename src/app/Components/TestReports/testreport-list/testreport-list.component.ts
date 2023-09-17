import { Component, OnInit } from '@angular/core';
import { TestReport } from 'src/app/Models/testreport.model';
import { TestReportService } from 'src/app/Services/testreport.service';
import * as moment from 'moment';
import { WorkstationService } from 'src/app/Services/workstation.service';

@Component({
  selector: 'app-testreport-list',
  templateUrl: './testreport-list.component.html',
  styleUrls: ['./testreport-list.component.css']
})
export class TestReportListComponent implements OnInit {

  constructor(private TestReportService:TestReportService, private WorkstationService:WorkstationService) {}

  logfiles: TestReport[] = [];
  workstations: any[] = [];
  filters:{key:string, value:string[]}[]=[
    {key:"workstation", value:[]},
    {key:"serialNumber", value:[]},
    {key:"result", value:[]},
    {key:"firstPass", value:[]},
    {key:"falseCall", value:[]},
    {key:"dut", value:[]},
    {key:"failure", value:[]},
    {key:"dateFrom", value:[]},
    {key:"dateTo", value:[]},
  ];
  serialNumbers:string = "";
  result:string = "All results";
  firstPass: string = "All runs";
  falseCall: string = "All";
  DUT:string = "";
  failure:string = "";
  fromDateTime:moment.Moment = moment(null);
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

    setInterval(this.filterResults.bind(this), 10000);
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

  firstPassFilterChanged($event: Event) {
    this.filters.forEach(filter => {
      if (filter.key == "firstPass")
      {
        if (this.firstPass == "All runs")
        {
          filter.value = [];
        }
        else if (this.firstPass == "True")
        {
          filter.value = ['true'];
        }
        else if (this.firstPass == "False")
        {
          filter.value = ['false'];
        }
      }
    });
    }

    falseCallFilterChanged($event: Event) {
      this.filters.forEach(filter => {
        if (filter.key == "falseCall")
        {
          if (this.falseCall == "All")
          {
            filter.value = [];
          }
          else if (this.falseCall == "True")
          {
            filter.value = ['true'];
          }
          else if (this.falseCall == "False")
          {
            filter.value = ['false'];
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

  filterResults() {
    this.TestReportService.getFilteredTestReports(this.filters).subscribe(
      {
        next:(logfiles)=>{
          this.logfiles = logfiles.sort((a, b) => a.recordCreated.valueOf() - b.recordCreated.valueOf());
        },
        error:(response)=>{
          console.log(response);
        }
      }
    )
    }

    getTableRowColor(item: TestReport): string {
      if (item.status == "Passed") {
        return 'tableRow-passed';
      } else {
        return 'tableRow-failed';
      }
    }
}
