import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle],
  template: `
    <h2 mat-dialog-title>Delete file</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this file?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">No</button>
      <button mat-button (click)="onConfirm()">Ok</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.data.id); // Pass back the ID of the item to delete
  }
}