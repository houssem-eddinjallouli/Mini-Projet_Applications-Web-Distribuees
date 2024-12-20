import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent as AdminHomeComponent } from './admin/home/home.component';
import { HomeComponent as UserHomeComponent } from './user/home/home.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizComponent } from './admin/quiz/quiz.component';
import { DetailsComponent } from './admin/quiz/details/details.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AvailabletestsComponent } from './user/quiz/availabletests/availabletests.component';
import { StudyComponent } from './user/quiz/study/study.component';
import { PassatestComponent } from './user/quiz/passatest/passatest.component';


export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' } ,
    { path: 'welcome', component: WelcomeComponent } ,
    { 
        path: 'admin', 
        component: AdminComponent,  
        children: [
          { path: '', redirectTo: '/admin/home', pathMatch: 'full' } ,
          { path: 'home', component: AdminHomeComponent } ,
          { path: 'quiz' , component:QuizComponent},
          { path: 'quiz/details/:id' , component:DetailsComponent},
        //   { path: 'documents/Visa', component: VisadocumentsComponent },
        //   { path: 'documents/Incription', component: InscriptiondocumentsComponent },
        //   { path: 'documents/Bourse', component: BoursedocumentsComponent },  
        //   { path: 'paiement' , component:PaiementComponent},
        ]
      },
      { 
        path: 'user', 
        component: UserComponent,  
        children: [
          { path: '', redirectTo: '/user/home', pathMatch: 'full' } ,
          { path: 'home', component: UserHomeComponent } ,
          { path: 'passatest/:id', component: PassatestComponent },
          { path: 'study/:id', component: StudyComponent },
          { path: 'quiz', component: AvailabletestsComponent },
        //   { path: 'documents' , component:DocumentsComponent},
        //   { path: 'documents/Visa', component: VisadocumentsComponent },
        ]
      },
      { path: '**' , component:ForbiddenComponent},
];
