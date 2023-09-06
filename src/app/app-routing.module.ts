import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DowntimesComponent } from './Components/downtimes/downtimes.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    data:{animation: 'isLeft'}
  },
  {
    path: 'downtimes',
    component:DowntimesComponent,
    data:{animation: 'isRight'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
