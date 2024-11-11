import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnasService } from '../../services/anas.service';


@Component({
  selector: 'app-anasuser',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center">User Dashboard</h2>
      
      <h3>Posts</h3>
      <ul class="list-group mb-4">
        <li class="list-group-item" *ngFor="let post of posts">
          <div>
            <strong>{{ post.content }}</strong>
            <small class="text-muted">by User {{ post.userId }}</small>
          </div>
          <button class="btn btn-info btn-sm mt-2" (click)="addReaction(post.id)">Add Reaction</button>
          <button class="btn btn-primary btn-sm mt-2" (click)="addComment(post.id)">Add Comment</button>
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
export class AnasuserComponent implements OnInit {
  posts: any[] = [];

  constructor(private anasService: AnasService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.anasService.getAllPosts().subscribe(data => this.posts = data);
  }

  addReaction(postId: number) {
    const reaction = { type: 'LIKE' }; // Example reaction
    this.anasService.addReaction(reaction, postId, 1).subscribe(() => alert('Reaction added'));
  }

  addComment(postId: number) {
    const comment = { content: 'Nice post!' }; // Example comment
    this.anasService.addComment(comment, postId, 1).subscribe(() => alert('Comment added'));
  }
}
