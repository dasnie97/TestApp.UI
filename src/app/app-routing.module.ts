import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DowntimesComponent } from './Components/downtimes/downtimes.component';
import { HomeComponent } from './Components/home/home.component';
import { AutocompleteRequireSelectionExample } from './Components/autocomplete-require-selection-example/autocomplete-require-selection-example.component';

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
  },
  {
    path: 'test',
    component:AutocompleteRequireSelectionExample,
    data:{animation: 'isRight'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
