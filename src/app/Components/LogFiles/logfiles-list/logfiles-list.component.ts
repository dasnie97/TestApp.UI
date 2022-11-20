import { Component, OnInit } from '@angular/core';
import { LogFile } from 'src/app/Models/logfile.model';
import { LogfilesService } from 'src/app/Services/logfiles.service';
import * as moment from 'moment';

@Component({
  selector: 'app-logfiles-list',
  templateUrl: './logfiles-list.component.html',
  styleUrls: ['./logfiles-list.component.css']
})
export class LogfilesListComponent implements OnInit {

  constructor(private logfileService:LogfilesService) { }

  logfiles: LogFile[] = [];
  workstations: string[] = [];
  workstationFilter: string = "All workstations";
  fromDateTime:moment.Moment = moment().subtract(1, 'day');
  toDateTime:moment.Moment = moment();

  ngOnInit(): void {
    this.logfileService.getAllLogfiles().subscribe(
      {
        next:(logfiles)=>{
          this.logfiles = logfiles;
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
    );
    this.logfileService.getAllWorkstations().subscribe(
      {
        next:(workstations)=>
        {
          this.workstations = workstations;
          this.workstations.splice(0, 0, 'All workstations');
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
    )
  }

  workstationChange()
  {
    this.logfileService.getFilteredLogFiles(this.workstationFilter).subscribe(
      {
        next:(logfiles)=>{
          this.logfiles = logfiles;
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
    );
  }

  fromDateTimeChange(dateTime:moment.Moment)
  {
    this.fromDateTime = dateTime;
  }

  toDateTimeChange(dateTime:moment.Moment)
  {
    this.toDateTime = dateTime;
  }
}
