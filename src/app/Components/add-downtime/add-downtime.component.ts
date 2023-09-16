import { Component, ElementRef, OnInit, ViewChild, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { CreateDowntimeReport } from 'src/app/Models/createdowntimereport.model';
import { DowntimereportService } from 'src/app/Services/downtimereport.service';
import { TestReportService } from 'src/app/Services/testreport.service';

@Component({
  selector: 'app-add-downtime',
  templateUrl: './add-downtime.component.html',
  styleUrls: ['./add-downtime.component.css']
})
export class AddDowntimeComponent implements OnInit {

  workstation = new FormControl('');
  workstations: {name:string, checked:boolean}[];
  filteredOptions: string[];
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  form: FormGroup;
  timeStarted:moment.Moment = moment();
  timeFinished:moment.Moment = moment();

  constructor(
    private _fb: FormBuilder, 
    private _downtimeReportService:DowntimereportService, 
    private TestReportService:TestReportService, 
    private _dialogRef: MatDialogRef<AddDowntimeComponent>) 
    {
    this.form = this._fb.group({
      problemDescription:'',
      actionTaken:'',
      technician:'',
      workstation:'',
      operator:'',
      timeStarted:'',
      timeFinished:'',
      totalDowntime:''
    })
   }

  ngOnInit(): void {
    this.TestReportService.getAllWorkstations().subscribe(
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
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.workstations.filter(o => o.name.toLowerCase().includes(filterValue)).map(o => o.name);
  }

  onFormSubmit()
  {
    if(this.form.valid)
    {
      this.form.patchValue({
        timeStarted: this.timeStarted.utcOffset(0, true).format(),
        timeFinished: this.timeFinished.utcOffset(0, true).format()
      });

      var downtimeReport: CreateDowntimeReport = new CreateDowntimeReport(this.form.value);
      var totalDowntime:moment.Moment = moment(0).subtract(1, 'hour').add(downtimeReport.totalDowntime, 'minutes');

      downtimeReport.totalDowntime = totalDowntime.utcOffset(0, true).format('HH:mm:ss');
      downtimeReport.workstation = this.workstation.value!;
      
      this._downtimeReportService.postDowntimeReport(downtimeReport).subscribe({
        next:(val:any) => {
          alert("Downtime report created succesfully!");
          this._dialogRef.close(true);
        },
        error:(err:any) => {
          console.log(err);
        }
      })
    }
  }

  timeFinishedChange(dateTime:moment.Moment)
  {
    this.timeFinished = dateTime;
  }

  timeStartedChange(dateTime:moment.Moment)
  {
    this.timeStarted = dateTime;
  }

}
