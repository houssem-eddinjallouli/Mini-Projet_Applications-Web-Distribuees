// quote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'https://api.quotable.io/random?tags=Motivational';

  constructor(private http: HttpClient) { }

  getMotivationalQuote(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
