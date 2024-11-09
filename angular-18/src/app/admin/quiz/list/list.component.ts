import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Test } from '../../../models/quiz';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
    ConfirmDeleteDialogComponent,
    MatBadgeModule,
  ],
  template: `
  <div class="card-container">
  <div *ngFor="let t of tests.reverse()">
    <mat-card class="example-card" appearance="outlined">
      <mat-card-header>
        <div 
          mat-card-avatar 
          [ngStyle]="{
            'background-color': t.active ? 'green' : 'red',
            'color': 'white', 
            'padding': '4px 8px', 
            'border-radius': '4px',
            'width': '100px',
            'text-align': 'center'
          }">
          {{ t.active ? 'Active' : 'Closed' }}
        </div>
        <mat-card-title>{{ t.title }}</mat-card-title>
        <mat-card-subtitle>
          Number of questions: {{ t.questions.length }}
        </mat-card-subtitle>
      </mat-card-header>

      <img mat-card-image [src]="t.image" alt="{{ t.title }}" />

      <mat-card-content>
        <p>{{ t.description }}</p>
      </mat-card-content>

      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['details', t.id]">View</button>
        <button mat-raised-button color="accent" (click)="active(t.id)">
          {{ t.active ? 'Deactivate' : 'Activate' }}
        </button>
        <button mat-raised-button color="warn" (click)="openDialog(t.id)">Delete</button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>


  `,
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public tests!: Test[];

  constructor(
    private quizservice: InteractiveQuizService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getalltests();
  }

  public getalltests(): void {
    this.quizservice.getTests().subscribe(
      (response: Test[]) => {
        this.tests = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { id: id }, // Pass the ID to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(result); // Call delete with the returned ID
      }
    });
  }

  delete(id: number): void {
    this.quizservice.deletetest(id).subscribe(() => {
      this.getalltests(); // Refresh the tests
    });
  }

  active(id: number): void {
    this.quizservice.activateanactivate(id).subscribe(() => {
      this.getalltests(); // Refresh the tests
    });
  }
}
