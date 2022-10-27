import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogfilesListComponent } from './Components/LogFiles/logfiles-list/logfiles-list.component';
import { AddLogfileComponent } from './Components/LogFiles/add-logfile/add-logfile.component';
import { FormsModule } from '@angular/forms';
import { EditLogfileComponent } from './Components/LogFiles/edit-logfile/edit-logfile.component';

@NgModule({
  declarations: [
    AppComponent,
    LogfilesListComponent,
    AddLogfileComponent,
    EditLogfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
