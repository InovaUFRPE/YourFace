import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: ServiceProvider
  ) {}

  goToHomeAluno() {
    this.restProvider.posLogintApi(this.UrlApi+'login/alunos', this.userCredenciais).then((result) => {
      const alunoLogado = JSON.parse(result['_body']);
      if (alunoLogado.token) {
        localStorage.setItem("token", alunoLogado.token);
      }else{
        console.log("erro ", alunoLogado.message);
      }
    }, (err) => {
      console.log("Erro", err);
    });
    
  } 
  ionViewDidLoad() {}
}