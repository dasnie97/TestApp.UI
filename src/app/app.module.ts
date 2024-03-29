import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort'

import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestReportListComponent } from './Components/TestReports/testreport-list/testreport-list.component';
import { AddTestReportComponent } from './Components/TestReports/add-testreport/add-testreport.component';

import { EditTestReportComponent } from './Components/TestReports/edit-testreport/edit-testreport.component';
import { CrashlogsComponent } from './Components/crashlogs/crashlogs.component';
import { MapComponent } from './Components/map/map.component';
import { ChartComponent } from './Components/chart/chart.component';
import { DatetimepickerComponent } from './Components/datetimepicker/datetimepicker.component';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DropDownComponent } from './Components/drop-down/drop-down.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DowntimesComponent } from './Components/downtimes/downtimes.component';
import { HomeComponent } from './Components/home/home.component';
import { AddDowntimeComponent } from './Components/add-downtime/add-downtime.component';
import {MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgFor, AsyncPipe} from '@angular/common';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    TestReportListComponent,
    AddTestReportComponent,
    EditTestReportComponent,
    CrashlogsComponent,
    MapComponent,
    ChartComponent,
    DatetimepickerComponent,
    DropDownComponent,
    NavbarComponent,
    HomeComponent,
    DowntimesComponent,
    AddDowntimeComponent
  ],
  imports: [
    NgxMatMomentModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSortModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgFor,
    AsyncPipe,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    {provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: {autoActiveFirstOption: false}},
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
