import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnasService, Post } from '../../services/anas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anasadmin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center">Admin Management</h2>
      
      <div class="container">
  <h2>Posts</h2>

  <!-- Display all posts -->
  <div *ngFor="let post of postsa" class="post">
    <h3>Post by User {{ post.userId }} on {{ post.createdAt | date }}</h3>
    <p>{{ post.content }}</p>
    <img *ngIf="post.image" [src]="post.image" alt="Post Image" width="200">
    <button (click)="deletePost(post.id)" class="btn btn-danger">Delete</button>
  </div>

  <!-- Form to add a new post -->
  <div class="add-post-form">
    <h3>Add New Post</h3>
    <form (ngSubmit)="onSubmit()">
      <textarea [(ngModel)]="newPostContent" name="content" placeholder="Write something..." required></textarea>
      <input type="file" (change)="onFileSelected($event)" />
      <button type="submit" class="btn btn-primary">Add Post</button>
    </form>
  </div>
</div>
<hr>


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

    .container {
  width: 80%;
  margin: auto;
}

.post {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
}

.post h3 {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.add-post-form {
  margin-top: 20px;
}

textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}

  `]
})
export class AnasadminComponent implements OnInit {
  posts: any[] = [];
  reactions: any[] = [];
  comments: any[] = [];

  constructor(private anasService: AnasService) {}

  ngOnInit() {
    this.loadPostsa();
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














  postsa: Post[] = [];
  newPostContent: string = '';
  selectedFile?: File;


  // Load all posts
  loadPostsa(): void {
    this.anasService.getPosts1().subscribe(
      (data: Post[]) => {
        this.postsa = data;
      },
      (error) => {
        console.error('Failed to load posts:', error);
      }
    );
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
      this.resizeImage(file, 800, 600).then((resizedFile) => {
        this.selectedFile = resizedFile;
      });
    }
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.floor((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.floor((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image.'));
            }
          }, file.type);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  }
  
  // Add a new post
  onSubmit(): void {
    const userId = 1; // Replace with the actual user ID
    if (this.newPostContent.trim()) {
      this.anasService.addPost1(this.newPostContent, userId, this.selectedFile).subscribe(
        (response) => {
          console.log('Post added successfully', response);
          this.newPostContent = '';
          this.selectedFile = undefined;
          this.loadPostsa(); // Refresh posts after adding
        },
        (error) => {
          console.error('Failed to add post:', error);
          this.loadPosts();
        }
      );
    }
  }

  // Delete a post
  deletePost(postId: number): void {
    this.anasService.removePost1(postId).subscribe(
      () => {
        console.log('Post deleted successfully');
        this.loadPostsa(); // Refresh posts after deletion
      },
      (error) => {
        console.error('Failed to delete post:', error);
      }
    );
  }

}
