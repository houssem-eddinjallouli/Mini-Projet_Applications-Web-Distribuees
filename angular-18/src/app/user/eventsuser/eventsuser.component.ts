import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventsuser',
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
    </div>
  `,
  styles: ``
})
export class EventsuserComponent implements OnInit{
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
