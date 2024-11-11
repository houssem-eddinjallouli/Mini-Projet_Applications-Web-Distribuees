import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-eventsuser',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      events !
    </p>

    <!-- Events Table -->
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let event of events">
            <td>{{ event.id }}</td>
            <td>{{ event.name }}</td>
            <td>{{ event.date | date: 'short' }}</td>
            <td>{{ event.createdAt | date: 'short' }}</td>
            <td>{{ event.updatedAt | date: 'short' }}</td>
          </tr>
        </tbody>
      </table>

      <!-- No Events Message -->
      <div *ngIf="events.length === 0" class="alert alert-info text-center mt-4">
        No events available.
      </div>
  `,
  styles: ``
})
export class EventsuserComponent {
  events: any[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getEvents().subscribe({
      next: (data) => this.events = data,
      error: (error) => console.error('Error fetching events:', error)
    });
  }

  addEvent(): void {
    const newEvent = { name: 'Sample Event', date: '2025-11-11T12:00:00Z' };
    this.eventsService.createEvent(newEvent).subscribe({
      next: (data) => {
        console.log('Event created:', data);
        this.loadEvents(); // Refresh the list after adding a new event
      },
      error: (error) => console.error('Error creating event:', error)
    });
  }
}
