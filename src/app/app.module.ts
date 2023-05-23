import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

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
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
