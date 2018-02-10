import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastraDisciplinaPage } from './cadastra-disciplina';

@NgModule({
  declarations: [
    CadastraDisciplinaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastraDisciplinaPage),
  ],
})
export class CadastraDisciplinaPageModule {}
