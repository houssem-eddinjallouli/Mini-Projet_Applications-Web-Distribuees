import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Question, Test } from '../../../models/quiz';
import { HttpErrorResponse } from '@angular/common/http';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,FormsModule,FormsModule],
  template: `
    <div class="test-details">

<div class="row">
    <div class="col-6">
        <h2>The Test</h2>
        <h2>Subject: {{ test.title }}</h2>
        <p>{{ test.description }}</p>
        <img [src]="test.image" class="test-image">
    </div>
    <a class="top"></a>
    <div class="col-6" >
        <div class="side-form">
            <h2>Update The Test</h2>
            <form (ngSubmit)="updateTest()">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" [(ngModel)]="newTitle" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" [(ngModel)]="newDescription" class="form-control"
                        rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
</div>
<a href="#bottom">Add a question</a>
<h3>Questions:</h3>
<ol class="question-list">
    <li *ngFor="let question of test.questions" class="question-item ">
        <div class="question-container">
            <button class="btn btn-danger rounded-0" (click)="deletequestion(question.id)">delete this
                question</button>

            <h4>{{ question.question }}</h4>
            <div *ngIf="question.image" class="question-image">
                <img [src]="question.image" alt="">
            </div>
            <ul class="options-list">
                <li *ngFor="let option of question.questionOptions" [class.correct]="option.iscorrect">
                    <label>
                        <input type="radio" [name]="question.id" [disabled]="true" [checked]="option.iscorrect">
                        <!-- Add radio input for visual indication of correct answer -->
                        {{ option.answer }}
                        <span class="indicator" *ngIf="option.iscorrect">Correct</span>
                    </label>
                </li>
            </ul>
        </div>
    </li>
</ol>
<div id="bottom">Bottom of the Page</div>
<div class="question-container" style="background-color: rgb(255, 212, 212);" >
    <h1>Add A Question</h1>
    <form (ngSubmit)="addQuestion()">
        <label for="question">Question:</label><br>
        <textarea id="question" name="question" [(ngModel)]="questionText" rows="4" cols="50" required class="form-control"></textarea><br><br>

        <fieldset>
            <legend>Options:</legend>

            <div class="option">
                <label for="answer1">Answer 1:</label>
                <input type="text" [(ngModel)]="answer1" id="answer1" name="answer1" required class="form-control">
                <input type="radio" id="correct1" [checked]="oneok" name="correct" (click)="onlyone()">
                <label for="correct1">Correct Answer</label>
            </div>

            <div class="option">
                <label for="answer2">Answer 2:</label>
                <input type="text" [(ngModel)]="answer2" id="answer2" name="answer2" required class="form-control">
                <input type="radio" id="correct2" [checked]="twook" name="correct" (click)="onlytwo()">
                <label for="correct2">Correct Answer</label>
            </div>
            <div class="row" *ngIf="!addthirdoption">
                <div class="col">
                    <button mat-button class="btn btn-primary" (click)="addthirdoption = !addthirdoption">
                        + Add an other option
                    </button>
                </div>
            </div>
            <div class="option" *ngIf="addthirdoption">
                <label for="answer3">Answer 3:</label>
                <input type="text" [(ngModel)]="answer3" id="answer3" name="answer3"  class="form-control">
                <input type="radio" id="correct3" [checked]="treeok" name="correct" (click)="onlytree()">
                <label for="correct3">Correct Answer</label>
                <div class="row" *ngIf="!addforthdoption">
                    <div class="col">
                        <button mat-button class="btn btn-primary" (click)="addforthdoption = !addforthdoption">
                            + Add an other option
                        </button>
                    </div>
                </div>
            </div>
            <div class="option" *ngIf="addforthdoption">
                <label for="answer4">Answer 4:</label>
                <input type="text" [(ngModel)]="answer4" id="answer4" name="answer4"  class="form-control">
                <input type="radio" id="correct4" [checked]="fourok" name="correct" (click)="onlyfour()">
                <label for="correct4">Correct Answer</label>
            </div>

            <!-- Add more options as needed -->

        </fieldset>

        <button type="submit" class="btn btn-success">Add The Question</button>
    </form>
    <a routerLink=".top">Scroll to Top</a>
</div>

</div>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  constructor(private quizservice: InteractiveQuizService, private activateroute: ActivatedRoute, private fb: FormBuilder) { }
  id!: number;
  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['id']
    this.gettestbyid();
  }
  //get the test by id 
  public test!: Test;
  gettestbyid() {
    this.quizservice.getatest(this.id).subscribe(
      (response: Test) => {
        this.test = response;
        this.newTitle = this.test.title;
        this.newDescription = this.test.description;
      },
      (error: HttpErrorResponse) => { alert(error.message); });
  }

  newTitle = '';
  newDescription = '';

  updateTest() {
    // Implement the logic to update the test with newTitle and newDescription
    this.test.title = this.newTitle;
    this.test.description = this.newDescription;
    // Call your service to save changes, etc.
    this.quizservice.modifyTest(this.test.id, this.newTitle, this.newDescription).subscribe();
  }

  deletequestion(id: number) {
    this.quizservice.deletequestion(id).subscribe();
    const index = this.test.questions.findIndex(question => question.id === id);
    if (index !== -1) {
      this.test.questions.splice(index, 1);
    }
  }

  //add a question
  addthirdoption = false;
  addforthdoption = false;
  oneok = true;
  twook = false;
  treeok = false;
  fourok = false;
  questionText = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';
  answer4 = '';
  question!: Question;
  options!: any[];

  addQuestion(): void {
    this.question = new Question();
    this.question.question = this.questionText;
    this.options = [];
    this.options.push({ answer: this.answer1, iscorrect: this.oneok });
    this.options.push({ answer: this.answer2, iscorrect: this.twook });
  
    if (this.addthirdoption && !this.addforthdoption) {
      this.options.push({ answer: this.answer3, iscorrect: this.treeok });
    }
  
    if (this.addforthdoption) {
      this.options.push({ answer: this.answer3, iscorrect: this.treeok });
      this.options.push({ answer: this.answer4, iscorrect: this.fourok });
    }
  
    this.question.questionOptions = this.options;
  
    this.quizservice.addQuestion(this.test.id, this.question).subscribe(() => {
      this.resetForm();
    });
  }
  
  resetForm(): void {
    // Reset form fields and flags
    this.questionText = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.oneok = true;
    this.twook = false;
    this.treeok = false;
    this.fourok = false;
    this.addthirdoption = false;
    this.addforthdoption = false;
  }
  onlyone(){
    this.oneok = true;
    this.twook = false;
    this.treeok = false;
    this.fourok = false;
  }
  onlytwo(){
    this.oneok = false;
    this.twook = true;
    this.treeok = false;
    this.fourok = false;
  }
  onlytree(){
    this.oneok = false;
    this.twook = false;
    this.treeok = true;
    this.fourok = false;
  }
  onlyfour(){
    this.oneok = false;
    this.twook = false;
    this.treeok = false;
    this.fourok = true;
  }
}
