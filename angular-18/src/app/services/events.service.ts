import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:3002/events';

  constructor(private http: HttpClient) { }

  // Get all events
  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Add a new event
  addEvent(event: { name: string, date: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }
}
