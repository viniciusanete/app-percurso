import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormTemaPage } from './form-tema';

@NgModule({
  declarations: [
    FormTemaPage,
  ],
  imports: [
    IonicPageModule.forChild(FormTemaPage),
  ],
})
export class FormTemaPageModule {}
