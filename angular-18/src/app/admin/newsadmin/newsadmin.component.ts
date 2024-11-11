import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/news.service';

@Component({
  selector: 'app-newsadmin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <h2>Admin - Manage News</h2>
      <form [formGroup]="newsForm" (ngSubmit)="onSubmit()" class="mb-4">
        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" formControlName="title" class="form-control" placeholder="Enter news title">
        </div>
        <div class="form-group mt-3">
          <label for="content">Content</label>
          <textarea id="content" formControlName="content" class="form-control" placeholder="Enter news content"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Add News</button>
      </form>

      <h3>News List</h3>
      <ul class="list-group">
        <li *ngFor="let news of newsList" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ news.name }}</h5>
            <p>{{ news.description }}</p>
          </div>
          <button class="btn btn-danger btn-sm" (click)="deleteNews(news.id)">Delete</button>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class NewsadminComponent {
  newsForm: FormGroup;
  newsList: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.newsForm = this.fb.group({
      title: [''],
      content: ['']
    });

    this.loadNews();
  }

  // Load all news items
  loadNews() {
    this.productService.getProducts().subscribe(response => {
      this.newsList = response.products;
    });
  }

  // Add new news item
  onSubmit() {
    const newProduct = {
      name: this.newsForm.value.title,
      description: this.newsForm.value.content
    };
    this.productService.addProduct(newProduct).subscribe(() => {
      this.loadNews(); // Refresh news list after adding
      this.newsForm.reset();
    });
  }

  // Delete a news item
  deleteNews(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadNews(); // Refresh news list after deletion
    });
  }
}
