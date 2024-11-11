import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ManefService } from '../../services/manef.service';

@Component({
  selector: 'app-manefuser',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>User Applications</h2>
      <div *ngIf="applications$ | async as applications; else loading">
        <div *ngFor="let application of applications" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Application ID: {{ application.id }}</h5>
            <p>Application Date: {{ application.applicationDate | date }}</p>
            <p>Status: {{ application.status }}</p>
            <p *ngIf="application.interviewDate">Interview Date: {{ application.interviewDate | date:'short' }}</p>
          </div>
        </div>
      </div>
      <ng-template #loading><p>Loading applications...</p></ng-template>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; }
  `]
})
export class ManefuserComponent implements OnInit {
  applications$: Observable<any[]> | undefined;

  constructor(private manefService: ManefService) {}

  ngOnInit(): void {
    this.applications$ = this.manefService.getApplications();
  }
}
