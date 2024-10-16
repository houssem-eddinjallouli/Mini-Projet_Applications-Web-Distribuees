import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisprinttwoService {

  constructor(private http: HttpClient) { } 
  //private apiZenQuotesUrl = 'https://zenquotes.io/api/random';
  private apiZenQuotesUrl = 'https://api.quotable.io/random';

  public getARandonQuote(): Observable<any> {
    return this.http.get<any>(`${this.apiZenQuotesUrl}`);
  }
}
