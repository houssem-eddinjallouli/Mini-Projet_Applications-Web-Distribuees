import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnasService {
  private apiServerUrlComment = 'http://localhost:8099/microservice-forum/comment'; 
  private apiServerUrlPost = 'http://localhost:8099/microservice-forum/post'; 
  private apiServerUrlReaction = 'http://localhost:8099/microservice-forum/reaction'; 

  private baseUrl = 'http://localhost:8099/microservice-forum/post'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  // Retrieve all posts
  getPosts1(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/retrieve-all-posts`);
  }

  // Add a new post
  addPost1(content: string, userId: number, image?: File): Observable<HttpResponse<Object>> {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.post<HttpResponse<Object>>(`${this.baseUrl}/add-post/${userId}`, formData, {
      observe: 'response'
    });
  }

  // Remove a post
  removePost1(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-post/${postId}`);
  }


  // Reaction API Methods
  getAllReactions(): Observable<any> {
    return this.http.get(`${this.apiServerUrlReaction}/retrieve-all-reactions`);
  }

  getReactionById(reactionId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrlReaction}/retrieve-reaction/${reactionId}`);
  }

  addReaction(reaction: any, postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiServerUrlReaction}/add-reaction/${postId}/${userId}`, reaction);
  }

  removeReaction(reactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrlReaction}/remove-reaction/${reactionId}`);
  }

  modifyReaction(reaction: any): Observable<any> {
    return this.http.put(`${this.apiServerUrlReaction}/modify-reaction`, reaction);
  }

  getReactionByPostAndUser(postId: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrlReaction}/get-reaction/${postId}/${userId}`);
  }

  countReactionsByPost(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrlReaction}/count-reaction/${postId}`);
  }

  // Post API Methods
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiServerUrlPost}/retrieve-all-posts`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrlPost}/retrieve-post/${postId}`);
  }

  addPost(content: string, userId: number, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    return this.http.post(`${this.apiServerUrlPost}/add-post/${userId}`, formData);
  }

  removePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrlPost}/remove-post/${postId}`);
  }

  modifyPost(post: any): Observable<any> {
    return this.http.put(`${this.apiServerUrlPost}/modify-post`, post);
  }

  // Comment API Methods
  getAllComments(): Observable<any> {
    return this.http.get(`${this.apiServerUrlComment}/retrieve-all-comments`);
  }

  getCommentsByPost(postId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrlComment}/retrieve-all-comments/${postId}`);
  }

  getCommentById(commentId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrlComment}/retrieve-comment/${commentId}`);
  }

  addComment(comment: any, postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiServerUrlComment}/add-comment/${postId}/${userId}`, comment);
  }

  removeComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrlComment}/remove-comment/${commentId}`);
  }

  modifyComment(comment: any): Observable<any> {
    return this.http.put(`${this.apiServerUrlComment}/modify-comment`, comment);
  }

  countCommentsByPost(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrlComment}/count-comments/${postId}`);
  }
}
export interface Post {
  id: number;
  createdAt: Date; 
  content: string;
  image: string;
  userId: number;
}