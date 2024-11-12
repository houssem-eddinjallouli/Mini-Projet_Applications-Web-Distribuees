import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { BacemService, Reservation } from '../../services/bacem.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manefmanefuser',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  template: `
    <h1>Reservation Management</h1>
    <form (ngSubmit)="createReservation()" #reservationForm="ngForm">
      <div>
        <label for="clubName">Club Name:</label>
        <input type="text" id="clubName" [(ngModel)]="newReservation.clubName" name="clubName" required>
      </div>
      <div>
        <label for="reservationDate">Reservation Date:</label>
        <input type="datetime-local" id="reservationDate" [(ngModel)]="newReservation.reservationDate" name="reservationDate" required>
      </div>
      <div>
        <label for="reservedBy">Reserved By:</label>
        <input type="text" id="reservedBy" [(ngModel)]="newReservation.reservedBy" name="reservedBy" required>
      </div>
      <button type="submit">Create Reservation</button>
    </form>

    <h2>All Reservations</h2>
    <ul>
      <li *ngFor="let reservation of reservations">
        {{ reservation.clubName }} - {{ reservation.reservationDate }} (Reserved by: {{ reservation.reservedBy }})
        <button (click)="deleteReservation(reservation.id)">Delete</button>
      </li>
    </ul>
  `,
  styles: [`
    h1, h2 {
      font-family: Arial, sans-serif;
    }
    form {
      margin-bottom: 20px;
    }
  `]
})
export class ManefmanefuserComponent {
  reservations: Reservation[] = [];
  newReservation: Reservation = {
    clubName: '',
    reservationDate: '',
    reservedBy: ''
  };

  constructor(private bacemService: BacemService) {
    this.loadReservations();
  }

  loadReservations(): void {
    this.bacemService.getAllReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  createReservation(): void {
    this.bacemService.createReservation(this.newReservation).subscribe(reservation => {
      this.reservations.push(reservation);
      this.newReservation = { clubName: '', reservationDate: '', reservedBy: '' }; // Reset form
    });
  }

  deleteReservation(id: number | undefined): void {
    if (id) {
      this.bacemService.deleteReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter(res => res.id !== id);
      });
    }
  }
}