import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { LogFile } from 'src/app/Models/logfile.model';
import { LogfilesService } from 'src/app/Services/logfiles.service';

@Component({
  selector: 'app-logfiles-list',
  templateUrl: './logfiles-list.component.html',
  styleUrls: ['./logfiles-list.component.css']
})
export class LogfilesListComponent implements OnInit {

  constructor(private logfileService:LogfilesService) { }

  logfiles: LogFile[] = [];
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
  }

}
