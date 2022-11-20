import { MatDatetimePickerInputEvent, NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { Component, OnInit} from '@angular/core';
import { FormControl} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { CustomNgxDatetimeAdapter } from './CustomNgxDatetimeAdapter';
import { Input, Output, EventEmitter } from '@angular/core';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'DD.MM.YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})

export class DatetimepickerComponent implements OnInit{

  @Input()
  placeholder!:string;
  @Input()
  initialValue!:moment.Moment;

  @Output() dateValue = new EventEmitter<moment.Moment>();

  date;

  constructor() {
    this.date = new FormControl(moment());
  }

  ngOnInit(): void {
    this.setDate(this.initialValue);
  }

  dateChange(value:moment.Moment)
  {
    this.dateValue.emit(value);
  }
  
  setDate(dateTime:moment.Moment)
  {
    this.date = new FormControl(dateTime);
  }
}
