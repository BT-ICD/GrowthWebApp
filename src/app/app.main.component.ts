import {Component, AfterViewInit, OnDestroy, ViewChild, Renderer2, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { PrimeNGConfig } from 'primeng/api';
import { AuthDataService } from './Core/services/auth/auth-data.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMainComponent implements AfterViewInit, OnDestroy, OnInit {

    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;

    documentClickListener: () => void;

    menuClick: boolean;

    topMenuButtonClick: boolean;

    configActive: boolean;

    configClick: boolean;

    inputStyle = 'outlined';

    ripple = false;
    private _actionItems: any[]; //Menu Items for Split Button for User Profile
    public get actionItems(): any[] {
        return this._actionItems;
    }
    public set actionItems(value: any[]) {
        this._actionItems = value;
    }
    loginStatus:boolean; //To determine login status - to load profile menu options
    currentUserName:string;
    constructor(public renderer: Renderer2, private primengConfig: PrimeNGConfig, private router:Router, private authDataService:AuthDataService) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.authDataService.loginStatus$.subscribe((data)=>this.loginStatus=data);
        this.authDataService.currentUserName$.subscribe((data)=>this.onUserLoginChange(data));
        this.initializeActionItems();
    }
    onUserLoginChange(data:string):void{
        this.currentUserName=data;
        this.initializeActionItems();
    }
    ngAfterViewInit() {
        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.isDesktop()) {
                if (!this.menuClick) {
                    this.menuActiveMobile = false;
                }

                if (!this.topMenuButtonClick) {
                    this.hideTopMenu();
                }
            }

            if (this.configActive && !this.configClick) {
                this.configActive = false;
            }

            this.configClick = false;
            this.menuClick = false;
            this.topMenuButtonClick = false;
        });

       
    }

    toggleMenu(event: Event) {
        this.menuClick = true;
        if (this.isDesktop()) {
            this.menuInactiveDesktop = !this.menuInactiveDesktop;
            if (this.menuInactiveDesktop) {
                this.menuActiveMobile = false;
            }
        } else {
            this.menuActiveMobile = !this.menuActiveMobile;
            if (this.menuActiveMobile) {
                this.menuInactiveDesktop = false;
            }
        }

        if (this.topMenuActive) {
            this.hideTopMenu();
        }

        event.preventDefault();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;
        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 500);
    }

    onMenuClick() {
        this.menuClick = true;
    }

    onRippleChange(event) {
        this.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    onSearchClick() {
        this.topMenuButtonClick = true;
    }
    //Menu Items for User Profile Split Button for logged in user
    initializeActionItems():void{
            this.actionItems = [
                {label: this.currentUserName, icon: 'pi pi-users', command: () => {
                  this.openProfile();
                    }
                },
                {label: 'Logout', icon: 'pi pi-users', command: () => {
                    this.logout();
                      }
                  }
             
          ];
    }
    
    openLogin():void{
        this.router.navigate(['/login']);
    }
    openProfile():void{
        alert('profile ...');
    }
    logout():void{
        this.authDataService.logout();
        this.router.navigate(['/login']);
    }
    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }
}
