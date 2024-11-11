import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnasService } from '../../services/anas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anasuser',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          <input [(ngModel)]="newReactionType" placeholder="Reaction type" class="form-control mt-2" />
          <button class="btn btn-info btn-sm mt-2" (click)="addReaction(post.id)">Add Reaction</button>
          <input [(ngModel)]="newCommentContent" placeholder="Comment content" class="form-control mt-2" />
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
  newReactionType: string = '';
  newCommentContent: string = '';

  constructor(private anasService: AnasService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.anasService.getAllPosts().subscribe(
      data => {
        console.log("Posts:", data);
        this.posts = data;
      },
      error => console.error("Error fetching posts:", error)
    );
  }
  

  addReaction(postId: number) {
    if (this.newReactionType.trim()) {
      const reaction = { type: this.newReactionType };
      this.anasService.addReaction(reaction, postId, 1).subscribe(() => {
        alert('Reaction added');
        this.newReactionType = '';
      });
    } else {
      alert('Please enter a reaction type');
    }
  }

  addComment(postId: number) {
    if (this.newCommentContent.trim()) {
      const comment = { content: this.newCommentContent };
      this.anasService.addComment(comment, postId, 1).subscribe(() => {
        alert('Comment added');
        this.newCommentContent = '';
      });
    } else {
      alert('Please enter a comment');
    }
  }
}
