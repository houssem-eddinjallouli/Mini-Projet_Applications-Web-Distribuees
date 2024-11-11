import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = 'http://localhost:3002/events';

  constructor(private http: HttpClient) { }

  // GET request to fetch all events
  getEvents(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // POST request to create a new event
  createEvent(eventData: { name: string; date: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, eventData, { headers });
  }
}
