import { Component, OnInit } from '@angular/core';
import { Test } from '../../../models/quiz';
import { HttpErrorResponse } from '@angular/common/http';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YoutubeComponent } from "../youtube/youtube.component";

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, YoutubeComponent],
  template: `
    <main class="main-wrapper">
  <div class="container-fluid">
    <h1>Study Space</h1>
    <p>Good luck!</p>
    <div class="row">
      <div class="col-md-6">
        <h3>
          prepare yourself to pass the quiz: <b>{{ test.title }}</b>
        </h3>
        <div *ngFor="let q of test.questions">
          <div class="card-body">
            <h4 style="color: red">theme:</h4>
            <p>{{ q.image }}</p>
            <h4 style="color: red">anecdote:</h4>
            <p>{{ q.anecdote }}</p>
            <h4 style="color: red">wikipedia lik:</h4>
            <a href="{{ q.wikipedia }}" target="_blank"
              >Visit Wikipedia for more information</a
            >
            <button class="btn btn-primary" (click)="openIFrame(q.wikipedia)">
              Open Wikipedia Here
            </button>
          </div>

        </div>
      </div>
      <div class="col-md-6">
        <div>
            <br>
            <button class="btn btn-primary" (click)="currentIframeUrl=!currentIframeUrl">search in youtube</button>
            <div  *ngIf="!currentIframeUrl">
            
            <app-youtube></app-youtube>
            
            </div>
          <iframe
            *ngIf="currentIframeUrl"
            [src]="currentIframeUrl"
            title="Wikipedia"
            width="95%"
            height="1500px"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</main>
  `,
  styleUrl: './study.component.css'
})
export class StudyComponent implements OnInit{

  iframeValues: Array<SafeResourceUrl> = [];
  currentIframeUrl: SafeResourceUrl | undefined;
  isIframeExpanded: boolean = false;

  openIFrame(url: string): void {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.currentIframeUrl = sanitizedUrl;
    this.isIframeExpanded = true;
    console.log(url);
  }
constructor(private quizservice: InteractiveQuizService, private activateroute: ActivatedRoute,private sanitizer: DomSanitizer){}
id:any;
ngOnInit(): void {
  this.id = this.activateroute.snapshot.params['id']
  this.gettestbyid();

}
public test!: Test;
gettestbyid() {
  this.quizservice.getatest(this.id).subscribe(
    (response: Test) => { this.test = response; },
    (error: HttpErrorResponse) => { alert(error.message); });
}

}
