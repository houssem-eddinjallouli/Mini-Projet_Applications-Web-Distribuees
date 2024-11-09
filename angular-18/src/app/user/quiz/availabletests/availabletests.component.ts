import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../../../models/quiz';
import { HttpErrorResponse } from '@angular/common/http';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { ZenquotesComponent } from "../zenquotes/zenquotes.component";
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-availabletests',
  standalone: true,
  imports: [RouterLink, ZenquotesComponent, CommonModule, MatPaginatorModule],
  template: `
<main class="main-wrapper">
    <div class="container-fluid">
        <div class="inner-contents">
            <app-zenquotes></app-zenquotes>
            <div class="page-header d-flex align-items-center justify-content-between mb-4">
                <div class="left-part">
                    <h2 class="text-dark">Available Tests!</h2>
                    <p class="text-gray mb-0">Choose a test to pass</p>
                </div>
                <div class="right-part d-flex align-items-center">
                    <div class="filtering d-flex align-items-center gap-3">
                        <a class="btn list-view p-0 fs-30" (click)="toListView()" *ngIf="gridview">list<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg></a>
                        <a class="btn grid-view p-0 fs-30" (click)="toGridView()" *ngIf="listview">grid<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg></a>
                    </div>
                </div>
            </div>

            <div class="row" *ngIf="gridview">
                <div class="col-xxl-4 col-lg-6" *ngFor="let t of getActiveTests().reverse() | slice: paginator.pageIndex * paginator.pageSize : (paginator.pageIndex + 1) * paginator.pageSize">
                    <div class="card border-0" style="background-color: rgb(229, 222, 236);">
                        <div class="card-body">
                            <div class="d-flex justify-content-between gap-4">
                                <div class="avatar-img w-auto rounded-2 overflow-hidden flex-shrink-0">
                                    <img [src]="t.image" alt="img" width="100%">
                                </div>
                            </div>
                            <div class="card-content mt-4">
                                <h5 class="mb-1">{{ t.title }} <br>- <span class="text-primary">{{ t.description }}</span></h5>
                                <small class="d-inline-block text-gray fs-14 fw-normal">Number of questions: {{ t.questions.length }}</small>
                            </div>
                            <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap btn-width-equal mt-4">
                                <a [routerLink]="['../passatest', t.id]" class="btn btn-primary ff-heading fs-14 fw-bold">Start the Test</a>
                            </div>
                            <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap btn-width-equal mt-4">
                                <a [routerLink]="['../study', t.id]" class="btn btn-primary ff-heading fs-14 fw-bold">Study before the test</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" *ngIf="listview">
                <div class="col-md-12">
                    <div class="list-group">
                        <div *ngFor="let t of getActiveTests().reverse() | slice: paginator.pageIndex * paginator.pageSize : (paginator.pageIndex + 1) * paginator.pageSize" class="list-group-item list-group-item-action">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="avatar-img w-auto rounded-2 overflow-hidden flex-shrink-0">
                                        <img [src]="t.image" alt="img" class="img-fluid" width="100%">
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="mt-4">
                                        <h5 class="mb-1">{{ t.title }}</h5>
                                        <p class="text-primary mb-1">{{ t.description }}</p>
                                        <p class="text-gray fs-14 fw-normal">Number of questions: {{ t.questions.length }}</p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mt-3">
                                        <a [routerLink]="['../passatest', t.id]" class="btn btn-primary ff-heading fs-14 fw-bold">Start the Test</a>
                                    </div>
                                    <div class="mt-3">
                                        <a [routerLink]="['../study', t.id]" class="btn btn-primary ff-heading fs-14 fw-bold">Study before the test</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <mat-paginator [length]="getActiveTests().length" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page" class="custom-paginator"></mat-paginator>
        </div>
    </div>
</main>
  `,
  styleUrls: ['./availabletests.component.css']
})
export class AvailabletestsComponent implements OnInit {
  dataSource: MatTableDataSource<Test>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  gridview = true;
  listview = false;

  tests: Test[] = [];
  interval: any;

  constructor(private quizservice: InteractiveQuizService) {
    this.dataSource = new MatTableDataSource<Test>(this.tests);
  }

  ngOnInit(): void {
    this.getTests();
    this.interval = setInterval(() => {
      this.getTests();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getTests(): void {
    this.quizservice.getTests().subscribe(
      (response: Test[]) => {
        this.tests = response;
        this.dataSource.data = this.tests;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching tests:', error);
      }
    );
  }

  getActiveTests(): Test[] {
    return this.tests.filter(test => test.active);
  }

  toListView(): void {
    this.gridview = false;
    this.listview = true;
  }

  toGridView(): void {
    this.gridview = true;
    this.listview = false;
  }
}