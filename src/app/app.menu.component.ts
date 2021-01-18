import {Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Master', icon: 'pi pi-fw pi-star', 
                items: [
                    {label: 'Subject', icon: 'pi pi-fw pi-id-card', routerLink: ['/subject']},
                    {label: 'Schedule', icon: 'pi pi-fw pi-check-square', routerLink: ['/schedule']}
                ]
            },
            {
                label: 'Transaction', icon: '', 
                items: [
                    {label: 'Subject', icon: 'pi pi-fw pi-id-card', routerLink: ['/subject']},
                    {label: 'Schedule', icon: 'pi pi-fw pi-check-square', routerLink: ['/schedule']}
                ]
            }
        ];
    }
}
