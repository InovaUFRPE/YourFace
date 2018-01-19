import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { FrequenciaAlunoPage } from '../frequencia-aluno/frequencia-aluno';

import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-login-aluno',
  templateUrl: 'login-aluno.html',
})
export class LoginAlunoPage {

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

    if (this.userCredenciais.cpf != null && this.userCredenciais.password != null) {
      this.restProvider.posLogintApi('login/alunos', this.userCredenciais).then((result) => {
        const alunoLogado = JSON.parse(result['_body']);
        if (alunoLogado.token) {
          //localStorage.setItem("token", alunoLogado.token);
          this.navCtrl.push(FrequenciaAlunoPage,  {parametro1:alunoLogado});
        }else{
          console.log("erro ", alunoLogado.message);
        }
      }, (err) => {
        console.log("Erro", err);
      });

    }
  }

}
