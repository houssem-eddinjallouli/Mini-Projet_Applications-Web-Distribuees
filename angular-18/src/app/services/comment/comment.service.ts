import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

    apiUrl = `http://localhost:8089/internshipApp/comment`;

    constructor(private http: HttpClient) { }

    // Fetch all comments
    getCommentsByPost(postId:Number ): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-comments/${postId}`);
    }

    // Fetch a single comment by id
    getCommentById(id: Number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/retrieve-comment/${id}`);
    }

    // Create a new comment
    createComment(content: any, postId: number, userId: number): Observable<any> {
        const commentData = { content }; // Create an object with comment data

        return this.http.post<any>(`${this.apiUrl}/add-comment/${postId}/${userId}`, commentData);
    }


    // Update an existing comment
    updateComment(comment: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/modify-comment`, comment);
    }

    // Delete a comment
    deleteComment(idComment: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/remove-comment/${idComment}`);
    }

    countComments(postId: number):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/count-comments/${postId}`);
    }
}
