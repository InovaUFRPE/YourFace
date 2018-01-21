
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AbrirTurmaProfessorPage } from '../abrir-turma-professor/abrir-turma-professor';
import { DisciplinaProfessorPage } from '../disciplina-professor/disciplina-professor';

import { IntroPage } from '../intro/intro';

@IonicPage()
@Component({
  selector: 'page-home-professor',
  templateUrl: 'home-professor.html',
})
export class HomeProfessorPage {
  cpfProf: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cpfProf = localStorage.getItem("id_prof")
  }

  goToChamadaPage() {
    ///abrirAta:idturma
    this.navCtrl.push(AbrirTurmaProfessorPage);
  }
  goToFrequenciaPage() {
    this.navCtrl.push(DisciplinaProfessorPage,{'tipo':'A','prof':this.cpfProf});
  }
  abrirRelatorio() {
    this.navCtrl.push(DisciplinaProfessorPage,{'tipo':'B','prof':this.cpfProf});
  }
  sair() {
    localStorage.clear();
    this.navCtrl.setRoot(IntroPage);
  }
}
