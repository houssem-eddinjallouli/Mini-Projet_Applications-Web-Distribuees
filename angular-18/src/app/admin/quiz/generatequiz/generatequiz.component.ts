import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-generatequiz',
  standalone: true,
  imports: [MatProgressSpinnerModule,ReactiveFormsModule,CommonModule],
  template: `
    <div class="container mt-4">
      <h1 class="mt-4">Generate a Test</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Tests/Generate</li>
      </ol>
      <div class="d-flex align-items-center mb-3">
        <img src="https://openquizzdb.org/media/pics/logo_v3_disp.png" alt="OpenQuizzDB Logo" style="height: 75px;" class="mr-3">
        <span style="font-size: 1.2rem; font-weight: bold;">Customize your quiz:</span>
      </div>
      <form [formGroup]="apiform" (ngSubmit)="test()">
        <div class="row">
          <div class="col-lg-6 mb-4">
            <label for="api_lang" class="font-weight-bold" style="color: #007bff;">Language:</label>
            <select formControlName="langue" class="form-control">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
              <option value="de">Allemand</option>
              <option value="es">Espagnol</option>
              <option value="it">Italien</option>
              <option value="nl">Néerlandais</option>
            </select>
          </div>
          <div class="col-lg-6 mb-4">
            <label for="api_nb_choix" class="font-weight-bold" style="color: #007bff;">Number of Choices:</label>
            <input formControlName="choix" class="form-control" type="number" min="2" max="4">
          </div>
          <div class="col-lg-6 mb-4">
            <label for="api_categ" class="font-weight-bold" style="color: #007bff;">Category:</label>
            <select formControlName="categorie" class="form-control">
              <option value="0">Toutes les catégories</option>
              <option value="animaux">Animaux</option>
              <option value="archeologie">Archéologie</option>
              <option value="arts">Arts</option>
              <option value="bd">Bande dessinée</option>
              <option value="celebrites">Célébrités</option>
              <option value="cinema">Cinéma</option>
              <option value="culture">Culture générale</option>
              <option value="gastronomie">Gastronomie</option>
              <option value="geographie">Géographie</option>
              <option value="histoire">Histoire</option>
              <option value="informatique">Informatique</option>
              <option value="internet">Internet</option>
              <option value="litterature">Littérature</option>
              <option value="loisirs">Loisirs</option>
              <option value="musique">Musique</option>
              <option value="nature">Nature</option>
              <option value="monde">Pays du monde</option>
              <option value="sciences">Sciences</option>
              <option value="sports">Sports</option>
              <option value="television">Télévision</option>
              <option value="tourisme">Tourisme</option>
              <option value="quotidien">Vie quotidienne</option>
            </select>
          </div>
          <div class="col-lg-6 mb-4">
            <label for="api_diff" class="font-weight-bold" style="color: #007bff;">Difficulty:</label>
            <select formControlName="difficulte" class="form-control">
              <option value="0">Toutes les difficultés</option>
              <option value="1">Débutant</option>
              <option value="2">Confirmé</option>
              <option value="3">Expert</option>
            </select>
          </div>
          <div class="col-lg-12 mb-4">
            <label style="color: #007bff; font-weight: bold;">Number of Questions:</label>
            <label style="color: #6a00ff; font-weight: bold; margin-left: 5px; font-size: 20px;">{{ selectedValue }}</label>
            <input formControlName="nbrquestions" type="range" min="5" max="30" (input)="updateValue($event)" class="form-range">
          </div>
          <div class="col-lg-6 mb-4">
            <label for="api_anec" class="font-weight-bold" style="color: #007bff;">Include Anecdote:</label>
            <select formControlName="anecdote" class="form-control">
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
          </div>
          <div class="col-lg-6 mb-4">
            <label for="api_wiki" class="font-weight-bold" style="color: #007bff;">Include Wikipedia Link:</label>
            <select formControlName="wikipedia" class="form-control">
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
          </div>
          <div class="col-lg-12 mb-4">
            <span style="color: red; font-weight: bold;">*</span> <span style="font-size: 0.9rem;">Required parameter</span>
          </div>
          <div class="col-lg-12 mt-3">
            <button type="submit" class="btn btn-success">Generate</button>
            <div *ngIf="spinner" class="middle-position">
              <mat-spinner color="warn"></mat-spinner>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./generatequiz.component.css'] 
})
export class GeneratequizComponent implements OnInit {
  spinner = false;
  apiform!: FormGroup;
  selectedValue: number = 0;
  quizsbyapi: any[] = [];
  private openquizzdbAPI = 'https://api.openquizzdb.org/?key=UMU4B6S7CD';
  private url: any;

  constructor(private fb: FormBuilder, private quizservice: InteractiveQuizService) { }

  ngOnInit(): void {
    this.apiform = this.fb.group({
      langue: ['fr'],
      choix: ['2'],
      categorie: ['0'],
      difficulte: ['0'],
      nbrquestions: ['10', Validators.required],
      anecdote: ['1'],
      wikipedia: ['1']
    });
  }

  updateValue(value: any) {
    this.selectedValue = value.target.value;
  }

  test() {
    this.spinner = true;
    this.url = this.openquizzdbAPI + "&lang=" + this.apiform.value.langue
      + "&choice=" + this.apiform.value.choix
      + "&categ=" + this.apiform.value.categorie
      + "&diff=" + this.apiform.value.difficulte
      + "&anec=" + this.apiform.value.anecdote
      + "&wiki=" + this.apiform.value.wikipedia;

    const requests = [];
    for (let i = 1; i <= this.apiform.value.nbrquestions; i++) {
      requests.push(this.quizservice.getaquestion(this.url));
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.quizsbyapi = responses.flatMap((response: any) => response.results);
      this.quizservice.addQuizApi(this.quizsbyapi).subscribe(() => {
        location.reload();
      });
      this.spinner = false; // Stop spinner after completion
    }, () => {
      this.spinner = false; // Stop spinner in case of error
    });
  }
}