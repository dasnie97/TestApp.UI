import { ConsoleLogger } from '@angular/compiler-cli';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CreateDowntimeReport } from 'src/app/Models/createdowntimereport.model';
import { DowntimereportService } from 'src/app/Services/downtimereport.service';

@Component({
  selector: 'app-add-downtime',
  templateUrl: './add-downtime.component.html',
  styleUrls: ['./add-downtime.component.css']
})
export class AddDowntimeComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[];
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  form: FormGroup;
  timeStarted:moment.Moment = moment();
  timeFinished:moment.Moment = moment();

  constructor(private _fb: FormBuilder, private _downtimeReportService:DowntimereportService) {
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

    this.filteredOptions = this.options.slice();
   }

  ngOnInit(): void {
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
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
      console.log(downtimeReport);
      

      /*this._downtimeReportService.postDowntimeReport(downtimeReport).subscribe({
        next:(val:any) => {
          console.log(val);
          alert("Dodano raport problemu!");
        },
        error:(err:any) => {
          console.log(err);
        }
      })*/
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
