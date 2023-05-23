import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestReport } from 'src/app/Models/testreport.model';
import { TestReportService } from 'src/app/Services/testreport.service';

@Component({
  selector: 'app-edit-testreport',
  templateUrl: './edit-testreport.component.html',
  styleUrls: ['./edit-testreport.component.css']
})
export class EditTestReportComponent implements OnInit {

  logFile:TestReport = {
    id:0,
    workstation:"",
    serialNumber:"",
    status:"",
    fixtureSocket:"",
    failure:"",
    operator:"",
    testDateTimeStarted: new Date()
  }
  constructor(private route: ActivatedRoute, private logFileService: TestReportService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) => {
        const id = params.get('id');
        if (id)
        {
          this.logFileService.getTestReport(id).subscribe({
            next:(response) =>
            {
              this.logFile = response;
            }
          })
        }
      }
    })
  }

  updateLogFile()
  {
    this.logFileService.updateTestReport(this.logFile).subscribe({
      next: (response) => {
        this.router.navigate(['logfiles']);
      }
    });
  }

  deleteLogFile(id:string)
  {
    this.logFileService.deleteTestReport(id).subscribe({
      next:(response) => {
        this.router.navigate(['logfiles']);
      }
    })
  }
}
