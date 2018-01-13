import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginAlunoPage } from '../login-Aluno/login-Aluno';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  objetoMensagem = {
    mensagem: "Mudamos a maneira como você é visto...",
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {}
  
  goToLoginAlunoPage() {
    localStorage.clear();
    this.navCtrl.push(LoginAlunoPage);
  }

  goToLoginPage() {
    localStorage.clear();
    this.navCtrl.push(LoginPage);
  }
}
