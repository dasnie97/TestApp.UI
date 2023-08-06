import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestReport } from 'src/app/Models/testreport.model';
import { TestReportService } from 'src/app/Services/testreport.service';

@Component({
  selector: 'app-add-testreport',
  templateUrl: './add-testreport.component.html',
  styleUrls: ['./add-testreport.component.css']
})
export class AddTestReportComponent implements OnInit {

  addLogFileRequest:TestReport = {
    id:0,
    workstation:"",
    serialNumber:"",
    isFirstPass:null,
    isFalseCall:null,
    status:"",
    fixtureSocket:"",
    failure:"",
    operator:"",
    testDateTimeStarted: new Date(),
    recordCreated: new Date()
  }
  constructor(private logFileService: TestReportService, private router: Router) { }

  ngOnInit(): void {

  }

  addLogFile()
  {
    this.logFileService.addTestReport(this.addLogFileRequest).subscribe({
      next:(logFile)=>{
        this.router.navigate(['logfiles']);
      }
    })
  }
}
