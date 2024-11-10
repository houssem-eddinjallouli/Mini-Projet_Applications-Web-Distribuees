import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManefService {
  private apiServerUrl = 'http://localhost:8099/microservice-inscriptions/app'; 

  constructor(private http: HttpClient) {}

  // Method to add an application
  addApplication(application: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/add_app`, application);
  }

  // Method to update an application
  updateApplication(application: any): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/modify-application`, application);
  }

  // Method to delete an application
  deleteApplication(applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/remove-application/${applicationId}`);
  }

  // Method to retrieve a single application by ID
  getApplication(applicationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/retrieve-application/${applicationId}`);
  }

  // Method to retrieve all applications
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/retrieve-all-applications`);
  }
}
