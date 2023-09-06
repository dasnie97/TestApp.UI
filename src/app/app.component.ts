import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './Models/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    slider
  ]
})
export class AppComponent {
  title = 'TestApp.UI';
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

