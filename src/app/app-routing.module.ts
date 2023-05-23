import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTestReportComponent } from './Components/TestReports/add-testreport/add-testreport.component';
import { EditTestReportComponent } from './Components/TestReports/edit-testreport/edit-testreport.component';
import { TestReportListComponent } from './Components/TestReports/testreport-list/testreport-list.component';

const routes: Routes = [
  {
    path: '',
    component:TestReportListComponent
  },
  {
    path: 'logfiles',
    component:TestReportListComponent
  },
  {
    path: 'logfiles/add',
    component:AddTestReportComponent
  },
  {
    path: 'logfiles/edit/:id',
    component:EditTestReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
