import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

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
    public alertLoginCtrl: AlertController,
    public restProvider: ServiceProvider
  ) {}

  goToHomeAluno() {

    if (this.userCredenciais.cpf != null && this.userCredenciais.password != null) {
      this.restProvider.posLogintApi('login/alunos', this.userCredenciais).then((result) => {
        const alunoLogado = JSON.parse(result['_body']);
        if (alunoLogado.success==true) {
          this.navCtrl.push(FrequenciaAlunoPage,  {parametro1:alunoLogado});
        }else{
          console.log("erro ", alunoLogado.message);
          this.showAlertErro();
        }
      }, (err) => {
        console.log("Erro", err);
        this.showAlertErro();
      });
    }else{
        this.showAlertErro();
    }



  }
  showAlertErro() {
    let alert = this.alertLoginCtrl.create({
      title: 'Login não realizado.',
      subTitle: 'Senha e/ou login errado.',
      buttons: ['OK']
    });
    alert.present();
  }
}
