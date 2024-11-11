import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-eventsadmin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div class="container">
    <h3>Events</h3>
    <ul>
      <li *ngFor="let event of events">
        {{ event.name }} - {{ event.date | date:'short' }}
      </li>
    </ul>

    <h4>Add New Event</h4>
    <form (submit)="onSubmit()">
      <label>
        Name:
        <input [(ngModel)]="newEvent.name" name="name" required>
      </label>
      <label>
        <br>
        Date:
        <input [(ngModel)]="newEvent.date" name="date" type="datetime-local" required>
      </label>
      <button class="btn btn-success" type="submit">Add Event</button>
    </form>

    </div>
  `,
  styles: []
})
export class EventsadminComponent implements OnInit {
  events: any[] = [];
  newEvent = { name: '', date: '' };

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  onSubmit(): void {
    if (this.newEvent.name && this.newEvent.date) {
      this.eventsService.addEvent(this.newEvent).subscribe(() => {
        this.loadEvents();  // Refresh the list
        this.newEvent = { name: '', date: '' }; // Reset form
      });
    }
  }
}
