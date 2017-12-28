import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http} from '@angular/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {}

  goToHomeAluno() {
    this.http.post(this.UrlApi+'login/alunos', this.userCredenciais).map(res => res.json())
      .subscribe(res => {
        console.log(res)
        if (res.token) {
          localStorage.setItem("token", res.token);
          console.log("Usuario LOgado");
        } else {
          console.log("erro " ,res.message);
        }


      }, (error) => {
        console.log("erro " + error);
      });


    console.log(this.userCredenciais);
  } 
  ionViewDidLoad() {
    console.log('login-aluno');
  }
}