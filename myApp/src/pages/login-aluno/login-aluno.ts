import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
