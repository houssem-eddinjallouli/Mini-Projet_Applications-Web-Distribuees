import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatDividerModule,RouterLink],
  template: `
    <mat-toolbar>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
    <mat-icon routerLink="/">menu</mat-icon>
  </button>
  <span routerLink="/">Esprit Clubs</span>
  <span class="example-spacer"></span>
  <button mat-raised-button routerLink="/admin">Login as an admin</button>
  <button mat-raised-button routerLink="/user">Log in as a siimple user</button>

  <span class="example-spacer"></span>
  <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
    <mat-icon>favorite</mat-icon>
  </button>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
    <mat-icon>share</mat-icon>
  </button>
</mat-toolbar>
<mat-divider></mat-divider>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}
  showNavbar = false;
  showSidebar = false;
  showFooter = false;
  ngOnInit() {
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
}
