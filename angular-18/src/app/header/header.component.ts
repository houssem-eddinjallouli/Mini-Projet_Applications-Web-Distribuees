import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { KeycloakService } from '../services/keycloak/keycloak.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatDividerModule,RouterLink, CommonModule ],
  template: `
    <mat-toolbar>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
    <mat-icon routerLink="/">menu</mat-icon>
  </button>
  <span routerLink="/">Esprit Clubs</span>
  <span class="example-spacer"></span>
  <button *ngIf="isAdmin" mat-raised-button routerLink="/admin">Login as an admin</button>
      <button *ngIf="isUser" mat-raised-button routerLink="/user">Log in as a simple user</button>

  <span class="example-spacer"></span>
  <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
    <mat-icon>favorite</mat-icon>
  </button>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
    <mat-icon>share</mat-icon>
  </button>

  <button (click)="endsession()" mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
    <mat-icon>exit_to_app</mat-icon>
  </button>
</mat-toolbar>
<mat-divider></mat-divider>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAdmin = false;
  isUser = false;

  constructor(private router: Router, private keycloakService: KeycloakService) {}
  showNavbar = false;
  showSidebar = false;
  showFooter = false;
  ngOnInit() {
    this.isUser=  this.keycloakService.isUser();
    this.isAdmin = this.keycloakService.isAdmin();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Type assertion to avoid TypeScript errors
        const routeData = this.router.routerState.snapshot.root.firstChild?.data as { [key: string]: boolean | undefined };

        // Access properties using bracket notation to avoid TypeScript errors
        this.showNavbar = routeData['showNavbar'] ?? false;
        this.showSidebar = routeData['showSidebar'] ?? false;
        this.showFooter = routeData['showFooter'] ?? false;
      }
    });
    }

    async endsession() {
      this.keycloakService.logout();
    }

    
}
