import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GrowthWebApp';
  constructor(private router:Router){
    this.router.events.subscribe((routerEvent:Event)=>{
      this.checkRouterEvents(routerEvent);
    });
  }
  checkRouterEvents(routerEvent:Event){
    if(routerEvent instanceof NavigationStart){
      // console.log('Navigation start');
    }
    if(routerEvent instanceof NavigationEnd || 
        routerEvent instanceof NavigationCancel || 
        routerEvent instanceof NavigationError  ){
          // console.log('Navigation End or Error or Cancelled')
    }
  }
}
