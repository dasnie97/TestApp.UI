import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLogfileComponent } from './Components/LogFiles/add-logfile/add-logfile.component';
import { EditLogfileComponent } from './Components/LogFiles/edit-logfile/edit-logfile.component';
import { LogfilesListComponent } from './Components/LogFiles/logfiles-list/logfiles-list.component';

const routes: Routes = [
  {
    path: '',
    component:LogfilesListComponent
  },
  {
    path: 'logfiles',
    component:LogfilesListComponent
  },
  {
    path: 'logfiles/add',
    component:AddLogfileComponent
  },
  {
    path: 'logfiles/edit/:id',
    component:EditLogfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
