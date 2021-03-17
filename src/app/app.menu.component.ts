import {Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthDataService } from './Core/services/auth/auth-data.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ng-container *ngIf="this.authDataService.isAuthenticated; then loggedIn; else guest">
            </ng-container>

            <ng-template #loggedIn>
                    <div [ngSwitch]="this.authDataService?.userRole">
                        <div *ngSwitchCase="'Manager'">
                            <ul class="layout-menu" >
                                <li app-menuitem *ngFor="let item of modelManager; let i = index;" [item]="item" [index]="i" [root]="true"></li>
                            </ul>
                        </div>
                        <div *ngSwitchCase="'Student'">
                            <ul class="layout-menu" >
                                <li app-menuitem *ngFor="let item of modelStudent; let i = index;" [item]="item" [index]="i" [root]="true"></li>
                            </ul>
                        </div>
                        <div *ngSwitchDefault>
                            <ul class="layout-menu"  >
                                <li app-menuitem *ngFor="let item of modelGuest; let i = index;" [item]="item" [index]="i" [root]="true"></li>
                            </ul>
                        </div>
                    </div>
            </ng-template>
            <ng-template #guest>
                 <ul class="layout-menu"  >
                    <li app-menuitem *ngFor="let item of modelGuest; let i = index;" [item]="item" [index]="i" [root]="true"></li>
                </ul>
            </ng-template>
         
        </div>
    `
})
export class AppMenuComponent implements OnInit {
    constructor( public authDataService:AuthDataService){}
    private modelManager: any[];
    private modelStudent: any[];
    private modelGuest:any[];
    isAuthenticated:boolean = this.authDataService.isAuthenticated;
    
    ngOnInit() {
        this.modelManager = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Master', icon: 'pi pi-fw', 
                items: [
                    {label: 'Subject', icon: 'pi pi-fw pi-id-card', routerLink: ['/subject']},
                    
                ]
            },
            {
                label: 'Transaction', icon: '', 
                items: [
                    {label: 'Schedule', icon: 'pi pi-fw pi-check-square', routerLink: ['/schedule']},
                    {label: 'Assignment', icon: 'pi pi-fw pi-id-card', routerLink: ['/assignment']},
                    {label: 'Exam', icon: 'pi pi-fw pi-id-card', routerLink: ['/examadminlist']},

                    
                ]
            }
        ];
        this.modelStudent = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/stuboard']},
            {
                label: "Let's do it", icon: '', 
                items: [
                    {label: 'Schedule', icon: 'pi pi-align-justify', routerLink: ['/myschedule']},
                    {label: 'Assignment', icon: 'pi pi-list', routerLink: ['/myassignments']},
                    {label: 'Exam', icon: 'pi pi-list', routerLink: ['/selectExam']}
                    
                ]
            }
            
        ];

        this.modelGuest= [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                // label: 'Welcome', icon: '', 
                // items: [
                //     //{label: 'Home', icon: '', routerLink: ['/']}
                 
                // ]
            }
            
        ];
       
        
    }
  
}
