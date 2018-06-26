import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaJogoPage } from './tela-jogo';

@NgModule({
  declarations: [
    TelaJogoPage,
  ],
  imports: [
    IonicPageModule.forChild(TelaJogoPage),
  ],
})
export class TelaJogoPageModule {}
