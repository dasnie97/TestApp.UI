import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DowntimesComponent } from './Components/downtimes/downtimes.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'downtimes',
    component:DowntimesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
