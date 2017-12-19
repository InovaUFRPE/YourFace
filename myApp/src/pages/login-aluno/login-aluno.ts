import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login-aluno',
  templateUrl: 'login-aluno.html',
})
export class LoginAlunoPage {
  UrlApi:any = 'http://localhost:3000/';

  public userCredenciais = {
    cpf: null,
    password: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  goToHomeAluno() {
    console.log(this.userCredenciais);
  } 
  ionViewDidLoad() {
    console.log('login-aluno');
  }
}