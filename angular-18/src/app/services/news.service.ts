import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = 'http://localhost:8099/python-microservice/products'; 

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl);
  }

  // Add a new product
  addProduct(product: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(this.apiServerUrl, product);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/${id}`);
  }
}
