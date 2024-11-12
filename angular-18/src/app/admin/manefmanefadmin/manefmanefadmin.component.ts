import { Component } from '@angular/core';
import { BacemService, Reservation } from '../../services/bacem.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manefmanefadmin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
   <h1>Reservation Management</h1>
    
    <h2>All Reservations</h2>
    <ul>
      <li *ngFor="let reservation of reservations">
        {{ reservation.clubName }} - {{ reservation.reservationDate }} (Reserved by: {{ reservation.reservedBy }})
        <button (click)="deleteReservation(reservation.id)">Delete</button>
      </li>
    </ul>
  `,
  styles: `
  
  h1, h2 {
      font-family: Arial, sans-serif;
    }
    form {
      margin-bottom: 20px;
    }
    
    `
})
export class ManefmanefadminComponent {
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
