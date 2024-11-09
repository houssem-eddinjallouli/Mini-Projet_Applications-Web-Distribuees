import { Component, OnInit } from '@angular/core';
import { ApisprinttwoService } from '../../../services/apisprinttwo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zenquotes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="quote-heading">Inspirational Quotes</h1>
<div *ngIf="quote" class="quote-container">
  <p class="quote-content">{{ quote.content }}</p>
  <p class="quote-author">- {{ quote.author }}</p>
</div>
<img *ngIf="lowername" [src]="'https://zenquotes.io/img/' + lowername + '.jpg'" alt="Author Image" class="author-image">
  `,
  styleUrl: './zenquotes.component.css'
})
export class ZenquotesComponent implements OnInit{
  quote: any;
  lowername:any;

  constructor(private quoteService: ApisprinttwoService) {}

  ngOnInit(): void {
    this.getQuoteRandomly();
  }

  getQuoteRandomly() {
    this.quoteService.getARandonQuote().subscribe((result) => {
      this.quote = result;
      this.lowername=result.author.toLowerCase().replace(/\s+/g, '-');;
      console.log(this.lowername)
    });
  }
}
