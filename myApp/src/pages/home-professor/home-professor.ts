
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { FrequenciaProfessorPage } from '../frequencia-professor/frequencia-professor';
import { AbrirTurmaProfessorPage } from '../abrir-turma-professor/abrir-turma-professor';

@IonicPage()
@Component({
  selector: 'page-home-professor',
  templateUrl: 'home-professor.html',
})
export class HomeProfessorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToChamadaPage() {
    ///abrirAta:idturma
    this.navCtrl.push(AbrirTurmaProfessorPage);
    console.log("teste");
  }

  goToFrequenciaPage() {
    this.navCtrl.push(FrequenciaProfessorPage);
    console.log("teste");
  }

  abrirRelatorio() {console.log("teste");}

  sair() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
