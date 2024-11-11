import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PostService {

    apiUrl = `http://localhost:8089/internshipApp/post`;

    constructor(private http: HttpClient) { }

    // Fetch all posts
    getPosts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-posts`);
    }

    // Fetch a single post by id
    getPostById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/retrieve-post/${id}`);
    }

    // Create a new post
    createPost(content: string, image: File | null, userId: number): Observable<any> {
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image, image.name);
        }

        const options = {
            headers: new HttpHeaders()
                //.set('Content-Type', 'multipart/form-data')
        };

        return this.http.post<any>(`${this.apiUrl}/add-post/${userId}`, formData, options);
    }

    // Update an existing post
    updatePost( post: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/modify-post`, post);
    }

    // Delete a post
    deletePost(idPost: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/remove-post/${idPost}`);
    }
}
