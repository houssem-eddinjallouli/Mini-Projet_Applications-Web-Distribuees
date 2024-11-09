import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { ListComponent } from "./list/list.component";
import { GeneratequizComponent } from "./generatequiz/generatequiz.component";
import { ImportquizComponent } from "./importquiz/importquiz.component";


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink, MatTabsModule, ListComponent, GeneratequizComponent, ImportquizComponent],
  template: `
 
 <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="center">
  <mat-tab label="First">
    <h1> Quiz list</h1>
<app-list/>


  </mat-tab>
  <mat-tab label="Second">
  <h1>Generate a Test  </h1>
  <app-generatequiz/></mat-tab>
  <mat-tab label="Third"><app-importquiz/></mat-tab>
</mat-tab-group>

        
        
  `,
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  activeTab: string = 'tab-7'; // Default active tab

  // Method to change the active tab
  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}
