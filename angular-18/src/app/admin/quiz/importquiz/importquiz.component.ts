import { Component, OnInit } from '@angular/core';
import { InteractiveQuizService } from '../../../services/interactive-quiz.service';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-importquiz',
  standalone: true,
  imports: [],
  template: `
    <div class="col-xxl-4 col-xl-4 col-lg-6">
      <div class="card border-0">
        <div class="card-body">
          <div class="d-flex justify-content-between mb-0">
            <div class="card-content">
              <h5 class="fw-semibold text-gray mb-1">OpenQuizzDB</h5>
              <h3 class="text-dark mb-1">www.openquizzdb.org</h3>
            </div>
            <div class="dropdown">
              <a href="#" data-bs-toggle="dropdown" class="fs-24">
                <i class="bi bi-three-dots-vertical"></i>
              </a>
              <div class="dropdown-menu p-0">
                <a class="dropdown-item" href="https://www.openquizzdb.org/" target="_blank">Visit website</a>
              </div>
            </div>
          </div>
          <!-- Middle Content -->
          <div>
            <h5 class="fw-semibold text-gray mb-1">Fournisseur de contenu libre depuis 2007</h5>
            <p class="fs-14 text-dark">OpenQuizzDB fournit tous ses contenus gratuitement, sans publicité, et sans recourir à l'exploitation des données personnelles de ses utilisateurs.</p>
          </div>
          <label for="jsonFile"
            class="custom-file-upload badge py-3 px-5 rounded-1 badge-soft-primary ff-heading fs-14 fw-bold">
            <input type="file" id="jsonFile" (change)="importjson($event)">
            Choose a JSON file
          </label>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./importquiz.component.css']
})
export class ImportquizComponent implements OnInit {
  constructor(private quizservice: InteractiveQuizService) {}

  ngOnInit(): void {}

  importjson(event: any) {
    const file = event.target.files[0];
    const fileName = file.name;

    const codeimage = this.extractNumberFromFileName(fileName);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      const parsedJson = JSON.parse(fileContent);
      const quiz: Quiz = Object.assign(new Quiz(), parsedJson);

      console.log('this is the end', quiz);
      this.quizservice.addQuiz(quiz, codeimage ? codeimage : "").subscribe(
        () => {
          console.log('Quiz added successfully');
        },
        (error) => {
          console.error('Failed to add quiz:', error);
        }
      );
    };

    reader.readAsText(file);
  }

  private extractNumberFromFileName(fileName: string): string | null {
    const numberRegex = /\d+/; // Regular expression to match a number
    const matches = fileName.match(numberRegex);

    return matches && matches.length > 0 ? matches[0] : null;
  }
}