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
import { ManefuserComponent } from './user/manefuser/manefuser.component';
import { ManefadminComponent } from './admin/manefadmin/manefadmin.component';
import { AnasuserComponent } from './user/anasuser/anasuser.component';
import { AnasadminComponent } from './admin/anasadmin/anasadmin.component';


export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' } ,
    { path: 'welcome', component: WelcomeComponent } ,
    { 
        path: 'admin', 
        component: AdminComponent,
        //canActivate: ['admin'],
        children: [
          { path: '', redirectTo: '/admin/home', pathMatch: 'full' } ,
          { path: 'home', component: AdminHomeComponent } ,
          { path: 'quiz' , component:QuizComponent},
          { path: 'quiz/details/:id' , component:DetailsComponent},

          { path: 'applicationstudent', component: ManefadminComponent },

          { path: 'forum', component: AnasadminComponent },

        //   { path: 'documents/Bourse', component: BoursedocumentsComponent },  
        //   { path: 'paiement' , component:PaiementComponent},
        ]
      },
      { 
        path: 'user', 
        component: UserComponent,
        //canActivate: ['user'],  
        children: [
          { path: '', redirectTo: '/user/home', pathMatch: 'full' } ,
          { path: 'home', component: UserHomeComponent } ,
          { path: 'passatest/:id', component: PassatestComponent },
          { path: 'study/:id', component: StudyComponent },
          { path: 'quiz', component: AvailabletestsComponent },

          { path: 'applicationstudent' , component:ManefuserComponent},

          { path: 'forum', component: AnasuserComponent },
          
        //   { path: 'documents/Visa', component: VisadocumentsComponent },
        ]
      },
      { path: '**' , component:ForbiddenComponent},
];