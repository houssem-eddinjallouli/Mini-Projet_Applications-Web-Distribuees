import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Test } from '../../../models/quiz';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { createClient, Photo } from 'pexels';

@Component({
  selector: 'app-passatest',
  standalone: true,
  imports: [CommonModule,RouterLink],
  template: `
    <main class="main-wrapper">
  <div class="container-fluid">
    <!-- {{id}}
        <div *ngFor="let q of test.questions">
            <p>{{ q.question }}</p>
            <ul>
                <li *ngFor="let o of q.questionOptions">
                    {{ o.answer }}
                </li>
            </ul>
        </div> -->
    <div *ngIf="!isQuizStarted" style="background-color: rgb(252, 240, 255)">
      <div
        class="row align-items-center justify-content-center vh-100"
        *ngIf="!showWarning && isQuizEnded == false"
      >
        <div class="col-10">
          <div class="card rounded-2 border-0 p-5 m-0">
            <div class="card-header border-0 p-0 text-center">
              <img
                src="https://png.pngtree.com/png-vector/20230503/ourmid/pngtree-quiz-time-bubble-speech-banner-vector-design-png-image_7078139.png"
                alt=""
              />
            </div>
            <div class="card-body p-0" style="text-align: center">
              <button
                class="btn btn-primary btn-lg rounded-1"
                type="button"
                (click)="showWarning = !showWarning"
              >
                <i class="bi bi-arrow-up-right-square-fill me-1"></i> Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row align-items-center justify-content-center vh-100"
        *ngIf="showWarning"
      >
        <div class="col-10">
          <div class="card rounded-2 border-0 p-5 m-0">
            <div class="card-header border-0 p-0 text-center">
              <h1>Some Rules of this Quiz</h1>
            </div>
            <div class="card-body p-0">
              <div class="alert alert-warning">
                <div class="info-list">
                  <div class="info">
                    1. You will have only <B>15 seconds</B> per each question.
                  </div>
                  <div class="info">
                    2. Once you select your answer, it can't be undone.
                  </div>
                  <div class="info">
                    3. You can't select any option once time goes off.
                  </div>
                  <div class="info">
                    4. You can't exit from the Quiz Once Started.
                  </div>
                </div>
              </div>
              <div class="buttons">
                <button
                  class="btn btn-primary btn-lg rounded-1"
                  routerLink="../../quiz"
                >
                  Exit Quiz
                </button>
                <button
                  class="btn btn-primary btn-lg rounded-1"
                  (click)="startQuiz()"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row align-items-center justify-content-center vh-100"
      *ngIf="isQuizStarted"
      style="background-color: rgb(252, 240, 255)"
    >
      <div class="col-10">
        <div class="card rounded-2 border-0 p-5 m-0 shadow">
          <div
            class="card-header border-0 p-0 text-center bg-primary text-white"
          >
            <div
              class="d-flex justify-content-between align-items-center"
              style="height: 100px"
            >
              <span class="fs-3"
                >Question: {{ currentQuestionNumber + 1 }}</span
              >
              <div class="timer-container fs-3">
                <div class="cont">
                  <div class="spinner"></div>
                  <span class="number">{{ remainingTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-0 text-center question-animation">
            <h5 class="card-title mt-4">
              {{ test.questions[currentQuestionNumber].question }}
            </h5>
            <div class="list-group list-group-flush">
              <button
                type="button"
                [ngClass]="{
                  disabled: isOptionSelectd(
                    test.questions[currentQuestionNumber].questionOptions
                  ),
                  'list-group-item list-group-item-action': true,
                  'bg-success': option.isSelected && option.iscorrect,
                  'bg-danger': option.isSelected && !option.iscorrect
                }"
                (click)="selectoption(option)"
                *ngFor="
                  let option of test.questions[currentQuestionNumber]
                    .questionOptions
                "
              >
                {{ option.answer }}
              </button>
            </div>
          </div>

          <div *ngIf="test.questions[currentQuestionNumber].image">
            theme: {{ test.questions[currentQuestionNumber].image }}
            <div class="photo-container">
              <img [src]="aa" alt="" />
            </div>
          </div>
          <div class="card-footer bg-white border-0">
            <div class="row justify-content-between">
              <div class="col-auto">
                <small
                  >Question {{ currentQuestionNumber + 1 }} of
                  {{ test.questions.length }}</small
                >
              </div>
              <div class="col-auto">
                <button
                  *ngIf="currentQuestionNumber + 1 != test.questions.length"
                  type="button"
                  class="btn btn-primary"
                  (click)="nextquestion()"
                >
                  Next question
                </button>

                <button
                  *ngIf="currentQuestionNumber + 1 == test.questions.length"
                  type="button"
                  class="btn btn-primary"
                  (click)="finish()"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div style="background-color: rgb(252, 240, 255);" class="row align-items-center justify-content-center vh-100"
            [ngClass]="isQuizEnded ? '' : ''" *ngIf="isQuizEnded">
            <div class="col-10">
                <div class="card rounded-2 border-0 p-5 m-0">
                    <div class="card-header border-0 p-0 text-center">
                        <h1 class="text-primary">Congratulations!</h1>
                        <p class="lead">You've completed the Quiz!</p>
                    </div>
                    <div class="card-body p-0">
                        <p class="text-center">You got <strong>{{correctAnswerCount}}</strong> out of
                            <strong>{{(test.questions).length}}</strong>
                        </p>
                    </div>
                    <div class="card-footer border-0">
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary btn-lg" routerLink="../../availabletest">Quit Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

    <div
      style="background-color: rgb(252, 240, 255)"
      class="row align-items-center justify-content-center vh-100"
      [ngClass]="isQuizEnded ? '' : ''"
      *ngIf="isQuizEnded"
    >
      <div class="col-10">
        <div class="card rounded-2 border-0 p-5 m-0">
          <div class="card-header border-0 p-0 text-center">
            <h1 class="text-primary" *ngIf="scorePercentage > 70">
              Congratulations!
            </h1>
            <p class="lead">You've completed the Quiz!</p>
          </div>
          <div class="card-body p-0">
            <p class="text-center">
              You got <strong>{{ correctAnswerCount }}</strong> out of
              <strong>{{ test.questions.length }}</strong>
            </p>
            <div class="text-center">
              <img
                *ngIf="scorePercentage === 100"
                src="https://th.bing.com/th/id/OIP.3Ho0MY3GdTURGmi7NT7U8QHaEJ?rs=1&pid=ImgDetMain"
                alt="Very Good"
              />
              <audio
                *ngIf="scorePercentage === 100"
                controls
                autoplay
                style="display: none"
              >
                <source src="/audio/passed.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <img
                *ngIf="scorePercentage >= 60 && scorePercentage < 100"
                src="https://th.bing.com/th/id/OIP.kmm97M5xYdS6f9C9PWaPvgHaHa?w=193&h=193&c=7&r=0&o=5&pid=1.7"
                alt="Passed"
              />
              <audio
                *ngIf="scorePercentage >= 60 && scorePercentage < 100"
                controls
                autoplay
                style="display: none"
              >
                <source src="/audio/win.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <img
                *ngIf="scorePercentage < 60"
                src="https://www.birdcount.org/wp-content/uploads/2021/02/2021_GBBCParticipationCert_French_210211_EDITABLE.jpg"
                alt="Failed"
              />
              <audio
                *ngIf="scorePercentage < 60"
                controls
                autoplay
                style="display: none"
              >
                <source src="/audio/wasted.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div *ngIf="showWastedEffect" class="overlay"></div>
              <img
                *ngIf="scorePercentage < 60 && showWastedEffect"
                width="30%"
                src="https://www.pikpng.com/pngl/b/295-2956635_san-andreas-wasted-png-clipart-png-download-gta.png"
                alt=""
                class="middle-position"
              />
            </div>
            <p class="text-center">{{ scoreMessage }}</p>
          </div>
          <div class="card-footer border-0">
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-primary btn-lg"
                routerLink="../../quiz"
              >
                Quit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
  `,
  styleUrl: './passatest.component.css'
})
export class PassatestComponent implements OnInit{
  constructor(private quizservice: InteractiveQuizService, private activateroute: ActivatedRoute) { }
  aa!: string;
  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  currentQuestionNumber: number = 0;
  remainingTime: number = 15;
  timer = interval(1000);
  subscription: Subscription[] = [];
  correctAnswerCount: number = 0;
  isQuizEnded: boolean = false;
  id!: number;
  showWastedEffect: boolean = false;
  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['id']
    this.gettestbyid();


  }

  scorePercentage: number = 0;
  scoreMessage: string = '';
  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;
    //
    
    // the results
    this.scorePercentage = (this.correctAnswerCount / this.test.questions.length) * 100;

    // Set score message based on percentage
    if (this.scorePercentage === 100) {
      this.scoreMessage = "Very Good! You are so good!";

    } else if (this.scorePercentage >= 60 && this.scorePercentage < 100) {

      this.scoreMessage = "Congratulations! You passed the test!";

    } else {
      this.scoreMessage = "Sorry, you failed.";
    
      this.showWastedEffect = true;
      setTimeout(() => {
        this.showWastedEffect = false;
      }, 5000);
    }
  }

  selectoption(option: any) {
    if (option.iscorrect) {
      this.correctAnswerCount++;
    }
    option.isSelected = true;
  }
  isOptionSelectd(options: any) {
    const selectioncount = options.filter((m: any) => m.isSelected == true);
    if (selectioncount == 0) {
      return false;
    } else {
      return true;
    }
  }

  nextquestion() {
    if (this.currentQuestionNumber < this.test.questions.length - 1) {
      this.currentQuestionNumber++;
      this.remainingTime = 15;
      this.searchPhotos((this.test.questions)[this.currentQuestionNumber].image);
    } else {
      this.subscription.forEach(element => {
        element.unsubscribe();
      })
    }
  }


  startQuiz() {
    this.searchPhotos((this.test.questions)[this.currentQuestionNumber].image);
    this.showWarning = false;
    this.isQuizStarted = true;
    this.subscription.push(this.timer.subscribe(res => {
      if (this.remainingTime != 0) {
        this.remainingTime--;
      }
      if (this.remainingTime == 0) {
        this.nextquestion();
        this.remainingTime = 15;
      }
    })
    )
  }

  //get the test by id 
  public test!: Test;
  gettestbyid() {
    this.quizservice.getatest(this.id).subscribe(
      (response: Test) => { this.test = response; },
      (error: HttpErrorResponse) => { alert(error.message); });
  }
  //



  // pixels api
  async searchPhotos(image: any) {
    //console.log('searchPhotos called'); // Add this line
    const query = image;
    const client = createClient('3HmHyURxliuydDWldMrrWvTw7Pq7mF4jpOoYf50Pd1oOdNifZv9JW6IY'); // Pexels API key
    try {
      const response: any = await client.photos.search({ query, per_page: 1 });
      const photos: any[] = response.photos;
      const imageUrl = photos[0]?.src?.original;
      //console.log(imageUrl); // This will log the URL of the image  
      this.aa = imageUrl;
    } catch (error) {
      console.error(error);

    }
  }
}
