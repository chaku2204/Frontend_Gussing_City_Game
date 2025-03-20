import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { GameComponent } from './quiz/game/game.component';
import { DashbordscoreComponent } from './quiz/dashbordscore/dashbordscore.component';

const routes: Routes = [ { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
  },
  {path:'dashboard', component:DashbordscoreComponent},
  { path: '**', redirectTo: 'auth/login' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
