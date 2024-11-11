import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnasService } from '../../services/anas.service';

@Component({
  selector: 'app-anasadmin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center">Admin Management</h2>
      
      <h3>Posts</h3>
      <ul class="list-group mb-4">
        <li class="list-group-item" *ngFor="let post of posts">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ post.content }}</span>
            <div>
              <button class="btn btn-primary btn-sm" (click)="editPost(post)">Edit</button>
              <button class="btn btn-danger btn-sm" (click)="confirmDeletePost(post.id)">Delete</button>
            </div>
          </div>
        </li>
      </ul>

      <h3>Reactions</h3>
      <ul class="list-group mb-4">
        <li class="list-group-item" *ngFor="let reaction of reactions">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ reaction.type }}</span>
            <button class="btn btn-danger btn-sm" (click)="confirmDeleteReaction(reaction.id)">Delete</button>
          </div>
        </li>
      </ul>

      <h3>Comments</h3>
      <ul class="list-group mb-4">
        <li class="list-group-item" *ngFor="let comment of comments">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ comment.content }}</span>
            <div>
              <button class="btn btn-primary btn-sm" (click)="editComment(comment)">Edit</button>
              <button class="btn btn-danger btn-sm" (click)="confirmDeleteComment(comment.id)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
    }
  `]
})
export class AnasadminComponent implements OnInit {
  posts: any[] = [];
  reactions: any[] = [];
  comments: any[] = [];

  constructor(private anasService: AnasService) {}

  ngOnInit() {
    this.loadPosts();
    this.loadReactions();
    this.loadComments();
  }

  loadPosts() {
    this.anasService.getAllPosts().subscribe(data => this.posts = data);
  }

  loadReactions() {
    this.anasService.getAllReactions().subscribe(data => this.reactions = data);
  }

  loadComments() {
    this.anasService.getAllComments().subscribe(data => this.comments = data);
  }

  confirmDeletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.anasService.removePost(id).subscribe(() => this.loadPosts());
    }
  }

  confirmDeleteReaction(id: number) {
    if (confirm('Are you sure you want to delete this reaction?')) {
      this.anasService.removeReaction(id).subscribe(() => this.loadReactions());
    }
  }

  confirmDeleteComment(id: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.anasService.removeComment(id).subscribe(() => this.loadComments());
    }
  }

  editPost(post: any) {
    const newContent = prompt('Edit post content:', post.content);
    if (newContent) {
      post.content = newContent;
      this.anasService.modifyPost(post).subscribe(() => this.loadPosts());
    }
  }

  editComment(comment: any) {
    const newContent = prompt('Edit comment content:', comment.content);
    if (newContent) {
      comment.content = newContent;
      this.anasService.modifyComment(comment).subscribe(() => this.loadComments());
    }
  }
}
