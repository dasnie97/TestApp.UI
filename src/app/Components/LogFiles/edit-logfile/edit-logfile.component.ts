import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogFile } from 'src/app/Models/logfile.model';
import { LogfilesService } from 'src/app/Services/logfiles.service';

@Component({
  selector: 'app-edit-logfile',
  templateUrl: './edit-logfile.component.html',
  styleUrls: ['./edit-logfile.component.css']
})
export class EditLogfileComponent implements OnInit {

  logFile:LogFile = {
    id:0,
    serialNumber:'',
    workstation:'',
    status:''
  }
  constructor(private route: ActivatedRoute, private logFileService: LogfilesService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) => {
        const id = params.get('id');
        if (id)
        {
          this.logFileService.getLogFile(id).subscribe({
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
    this.logFileService.updateLogFile(this.logFile).subscribe({
      next: (response) => {
        this.router.navigate(['logfiles']);
      }
    });
  }

  deleteLogFile(id:string)
  {
    this.logFileService.deleteLogFile(id).subscribe({
      next:(response) => {
        this.router.navigate(['logfiles']);
      }
    })
  }
}
