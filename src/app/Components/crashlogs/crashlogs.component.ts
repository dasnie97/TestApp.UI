import { Component, OnInit } from '@angular/core';
import { Crashlog } from 'src/app/Models/crashlog.model';

@Component({
  selector: 'app-crashlogs',
  templateUrl: './crashlogs.component.html',
  styleUrls: ['./crashlogs.component.css']
})
export class CrashlogsComponent implements OnInit {

  problems :Crashlog[]= [{
    id:0,
    workstation:'',
    problem:'',
    action:'',
    technician:'',
    operator:'',
    time: new Date(0, 0, 0, 0, 0, 0, 0),
    status:''
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
