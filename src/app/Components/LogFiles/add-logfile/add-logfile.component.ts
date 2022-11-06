import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogFile } from 'src/app/Models/logfile.model';
import { LogfilesService } from 'src/app/Services/logfiles.service';

@Component({
  selector: 'app-add-logfile',
  templateUrl: './add-logfile.component.html',
  styleUrls: ['./add-logfile.component.css']
})
export class AddLogfileComponent implements OnInit {

  addLogFileRequest:LogFile = {
    id:0,
    workstation:"",
    serialNumber:"",
    status:"",
    fixtureSocket:"",
    failure:"",
    operator:"",
    testDateTimeStarted: new Date()
  }
  constructor(private logFileService: LogfilesService, private router: Router) { }

  ngOnInit(): void {

  }

  addLogFile()
  {
    this.logFileService.addLogFile(this.addLogFileRequest).subscribe({
      next:(logFile)=>{
        this.router.navigate(['logfiles']);
      }
    })
  }
}
