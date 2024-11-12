import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule, MatButtonModule, MatIconModule,RouterLink],
  template: `
      <mat-toolbar>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
    <mat-icon>menu</mat-icon>
  </button>
  <span>Esprit Cleubs</span>
  <span class="example-spacer"></span>
  <button mat-flat-button routerLink="/user/home">User Dashboard</button>
  <button mat-flat-button routerLink="/user/news">News(python)</button>
  <button mat-flat-button routerLink="/user/events">events(express-js)</button>
  <button mat-flat-button routerLink="/user/quiz">Pass a Quiz</button>
  <button mat-flat-button routerLink="/user/applicationstudent">Student Application</button>
  <button mat-flat-button routerLink="/user/forum">Forum Space</button>
  <button mat-flat-button routerLink="/user/reser">Reservation Space</button>
  <span class="example-spacer"></span>
  <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
    <mat-icon>favorite</mat-icon>
  </button>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
    <mat-icon>share</mat-icon>
  </button>
</mat-toolbar>

    <router-outlet/>
  `,
  styleUrl: './user.component.css'
})
export class UserComponent {

}
