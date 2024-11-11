import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternshipOfferService {
  
  apiUrl = `http://localhost:8089/internshipApp/inter`; 

  constructor(private http: HttpClient) { }

  // Fetch all internship offers
  getInternshipOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-interofs`);
  }

  // Fetch a single internship offer by id
  getInternshipOfferById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/retrieve-interof/${id}`);
  }

  // Create a new internship offer
  createInternshipOffer(offer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_inter`, offer);
  }

  // Update an existing internship offer
  updateInternshipOffer(id: number, offer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-inter`, offer);
  }

  // Delete an internship offer
  deleteInternshipOffer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-inter/${id}`);
  }

  uploadInternshipOffersExcel(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
}
}
