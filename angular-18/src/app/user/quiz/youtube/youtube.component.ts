import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `

<div>
  <input type="text" [(ngModel)]="search.keyword" placeholder="Search" />
  <button mat-fab (click)="searchYoutube()">Search  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>
</div>



<div *ngIf="isLoading">Loading...</div>

<div *ngIf="error">
  {{ error }}
</div>

<div *ngIf="response.items">
  <div *ngFor="let item of response.items.reverse()">
    <div>{{ item.snippet.title }}</div>
    <iframe
      [src]="getVideoSource(item.id.videoId)"
      width="560"
      height="315"
      frameborder="0"
      allowfullscreen
    ></iframe>

  </div>
</div>
  `,
  styleUrl: './youtube.component.css'
})
export class YoutubeComponent {
  houssem!:any[];
  isLoading: boolean = false;
  error: string = '';
  response: any = {};
  search: any = { keyword: '', channelId: '', type: '', maxResults: 5 };
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {}

  searchYoutube(): void {
    this.isLoading = true;
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'XXXXXXXXXXX')
      .set('q', this.search.keyword)
      .set('type', this.search.type)
      .set('channelId', this.search.channelId)
      .set('maxResults', this.search.maxResults);
    const options = { params: urlParams };
    this.http.get<any>(url, options).subscribe(
      (data) => {
        this.response = data;
        console.log(this.response);
        this.isLoading = false;
      },
      (err) => {
        this.error = err;
        console.log(err);
        this.isLoading = false;
      }
    );
  }
  getVideoSource(id: string): SafeResourceUrl {
    if (id != '') {
      const url = 'https://www.youtube.com/embed/' + id;
      // this.houssem.push(url);
      // console.log(this.houssem);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return '';
    }
  }
}
