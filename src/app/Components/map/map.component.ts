import { Component, OnInit } from '@angular/core';
import { WorkstationService } from 'src/app/Services/workstation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  workstations: any[] = [];
  constructor(private workstationService: WorkstationService) { }

  ngOnInit(): void
  {
    this.workstationService.getWorkstations().subscribe(
      {
        next:(workstations)=>
        {
          this.workstations = workstations;
        },
        error:(response)=>
        {
          console.log(response);
        }
      })

      
  }

}
