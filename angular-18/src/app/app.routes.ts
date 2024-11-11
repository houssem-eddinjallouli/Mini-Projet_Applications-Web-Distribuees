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

import { AnasuserComponent } from './user/anasuser/anasuser.component';
import { AnasadminComponent } from './admin/anasadmin/anasadmin.component';
import { NewsuserComponent } from './user/newsuser/newsuser.component';
import { NewsadminComponent } from './admin/newsadmin/newsadmin.component';
import { adminGuard, userGuard } from './services/guard/auth.guard';
import { ManefadminComponent } from './admin/bacemadmin/manefadmin.component';
import { ManefuserComponent } from './user/bacemuser/manefuser.component';


export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' } ,
    { path: 'welcome', component: WelcomeComponent } ,
    { 
        path: 'admin', 
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
          { path: '', redirectTo: '/admin/home', pathMatch: 'full' } ,
          { path: 'home', component: AdminHomeComponent } ,
          { path: 'quiz' , component:QuizComponent},
          { path: 'quiz/details/:id' , component:DetailsComponent},

          { path: 'applicationstudent', component: ManefadminComponent },

          { path: 'forum', component: AnasadminComponent },

          { path: 'news', component: NewsadminComponent },

          //{ path: 'events', component: BoursedocumentsComponent },  

        //   { path: 'paiement' , component:PaiementComponent},
        ]
      },
      { 
        path: 'user', 
        component: UserComponent,
        canActivate: [userGuard],
        children: [
          { path: '', redirectTo: '/user/home', pathMatch: 'full' } ,
          { path: 'home', component: UserHomeComponent } ,
          { path: 'passatest/:id', component: PassatestComponent },
          { path: 'study/:id', component: StudyComponent },
          { path: 'quiz', component: AvailabletestsComponent },

          { path: 'applicationstudent' , component:ManefuserComponent},

          { path: 'forum', component: AnasuserComponent },

          { path: 'news', component: NewsuserComponent },

          //{ path: 'events', component: BoursedocumentsComponent }, 

          //   { path: 'paiement' , component:PaiementComponent},
        ]
      },
      { path: '**' , component:ForbiddenComponent},
];
