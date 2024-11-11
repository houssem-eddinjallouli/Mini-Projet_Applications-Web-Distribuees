

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReactionService {
    apiUrl = `http://localhost:8089/internshipApp/reaction`;


    constructor(private http: HttpClient) { }

    reactToPost(postId: number,  userId: number,reactionType: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/add-reaction/${postId}/${userId}`, { reactionType });
    }
    getReaction(postId: number, userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get-reaction/${postId}/${userId}`);
    }
    removeReaction(reactionId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/remove-reaction/${reactionId}`);
    }

    changeReaction(reaction: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/modify-reaction`, reaction);
    }

    countReaction(postId: number):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/count-reaction/${postId}`);
    }




}
