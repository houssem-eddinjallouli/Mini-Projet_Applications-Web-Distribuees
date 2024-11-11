import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/news.service';

@Component({
  selector: 'app-newsuser',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>User - News</h2>
      <ul class="list-group">
        <li *ngFor="let news of newsList" class="list-group-item">
          <h5>{{ news.name }}</h5>
          <p>{{ news.description }}</p>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class NewsuserComponent implements OnInit {
  newsList: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  // Load all news items
  loadNews() {
    this.productService.getProducts().subscribe(response => {
      this.newsList = response.products;
    });
  }
}
