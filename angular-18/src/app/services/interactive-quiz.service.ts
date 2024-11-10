import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Question, Quiz, Test } from '../models/quiz';
@Injectable({
  providedIn: 'root'
})
export class InteractiveQuizService {
  private apiUrl = 'https://api.pexels.com/v1/';
  private apiKey = '3HmjnHyURxliuydjkOoYf50Pd1oOdNifZv9JW6IY';
  private apiServerUrl = 'http://localhost:8099/microservice-quiz/quiz';
          


  constructor(private http: HttpClient, private router: Router) {}

  getImageUrl(query: string): Observable<string> {
    const url = `${this.apiUrl}search/photos?query=${encodeURIComponent(
      query
    )}&per_page=1`;
    const headers = { Authorization: this.apiKey };
    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        if (response && response.photos && response.photos.length > 0) {
          return response.photos[0].src.large2x;
        } else {
          throw new Error('No images found for the query.');
        }
      })
    );
  }

  public deletetest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }

  public deletequestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deletequestion/${id}`);
  }
  public getTests(): Observable<Test[]> {
    return this.http.get<any>(`${this.apiServerUrl}/retrieve-all-tests`);
  }

  public getatest(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiServerUrl}/retrieve-test/${id}`);
  }

  addQuiz(quiz: Quiz, img: string): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/add-quiz/${img}`, quiz);
  }

  public activateanactivate(userId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiServerUrl}/activateanactivate/${userId}`,
      {}
    );
  }

  public getaquestion(link: any): Observable<any> {
    return this.http.get<any>(`${link}`);
  }

  addQuizApi(quizs: any[]): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/add-quiz-api`, quizs);
  }

  public modifyTest(
    id: number,
    title: string,
    description: string
  ): Observable<string> {
    return this.http.put<string>(
      `${this.apiServerUrl}/updatetest/${id}/${title}/${description}`,
      {}
    );
  }

  addQuestion(id: number, question: Question): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/add-question/${id}`,
      question
    );
  }
}
