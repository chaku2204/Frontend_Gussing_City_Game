import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';

import { GameComponent } from './game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DashbordscoreComponent } from './dashbordscore/dashbordscore.component';

@NgModule({
  declarations: [
  
    GameComponent,
   
  ],
  imports: [

    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class QuizModule { }
