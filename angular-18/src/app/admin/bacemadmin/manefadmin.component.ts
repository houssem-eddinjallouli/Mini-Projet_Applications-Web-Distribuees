import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ManefService } from '../../services/manef.service';

enum StatusType {
  REFUSED = 'REFUSED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING'
}

@Component({
  selector: 'app-manefadmin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Admin Application Management</h2>
      
      <form (ngSubmit)="addApplication()" class="mb-4">
        <div class="mb-3">
          <label for="applicationDate" class="form-label">Application Date</label>
          <input type="date" id="applicationDate" class="form-control" [(ngModel)]="newApplication.applicationDate" name="applicationDate" required>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select id="status" class="form-control" [(ngModel)]="newApplication.status" name="status" required>
            <option *ngFor="let status of statusTypes" [value]="status">{{ status }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="applicationDate" class="form-label">Interview Date</label>
          <input type="date" id="applicationDate" class="form-control" [(ngModel)]="newApplication.interviewDate" name="applicationDate" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Application</button>
      </form>
      
      <div *ngIf="applications$ | async as applications; else loading">
        <div *ngFor="let application of applications" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Application ID: {{ application.id }}</h5>
            <p>Application Date: {{ application.applicationDate | date }}</p>
            <p>Status: {{ application.status }}</p>
            <p *ngIf="application.interviewDate">Interview Date: {{ application.interviewDate | date:'short' }}</p>
            <button (click)="deleteApplication(application.id)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      </div>
      <ng-template #loading><p>Loading applications...</p></ng-template>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; }
    .btn-danger { margin-top: 10px; }
  `]
})
export class ManefadminComponent implements OnInit {
  applications$: Observable<any[]> | undefined;
  newApplication = { applicationDate: '', status: StatusType.PENDING, interviewDate:'' };
  statusTypes = Object.values(StatusType);

  constructor(private manefService: ManefService) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.applications$ = this.manefService.getApplications();
  }

  addApplication(): void {
    this.manefService.addApplication(this.newApplication).subscribe(() => {
      this.fetchApplications();
      this.newApplication = { applicationDate: '', status: StatusType.PENDING,interviewDate:'' };
    });
  }

  deleteApplication(applicationId: number): void {
    this.manefService.deleteApplication(applicationId).subscribe(() => {
      this.fetchApplications();
    });
  }
}