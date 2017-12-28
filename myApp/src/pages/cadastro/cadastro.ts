import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  UrlApi = "http://localhost:3000/";
  public dados = {
    name: null,
    cpf: null,
    password: null,
    passwordConf: null,
    email: null,
    emailConf: null,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCadastroCtrl: AlertController,
    public restProvider: ServiceProvider) {
  }

  TestaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  fazerCadastro(): boolean {
    // Pega as informações do usuário
    var name = this.dados.name;
    var cpf = this.dados.cpf;
    var email = this.dados.email;
    var emailConf = this.dados.emailConf;
    var senha = this.dados.password;
    var SenhaConf = this.dados.passwordConf;

    if (name == undefined) {
      alert('O login é um campo obrigatório.');
      return;
    }
    if(cpf == undefined) {
      alert('O CPF é um campo obrigatório.');
      return;
    }
    if (email == undefined) {
      alert('O e-mail é um campo obrigatório.');
      return;
    }
    if (emailConf == undefined) {
      alert('O e-mail de confimação é um campo obrigatório.');
      return;
    }
    if (senha == undefined) {
      alert('A senha é um campo obrigatório.');
      return;
    }
    if (SenhaConf == undefined) {
      alert('A senha de confimação é um campo obrigatório.');
      return;
    }
    if (senha.length < 8) {
      alert('A senha deve ter pelo menos "8" caracteres.');
      return;
    }

    if (senha !== SenhaConf) {
      alert('As senhas não são iguais.')
      return;
    }

    if (email !== emailConf) {
      alert('E-mails não são iguais.');
      return;
    }
    if (this.TestaCPF(cpf)==false) {
      alert('Cpf inválido.');
      return;
    }
    // Cria o objeto usuario e o cadastro no BD
    var usuarioDiretor: object = {
      name: name,
      cpf: cpf,
      password: senha,
      email: email,
    };

    this.restProvider.postApi(this.UrlApi+'coordenador', usuarioDiretor).then((result) => {
      console.log(result);
      this.showAlert();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log(err);
      this.showAlertErro();
    });
  }


  goToHomePage2() {
    this.navCtrl.setRoot(HomePage);
  }
  
  showAlert() {
    let alert = this.alertCadastroCtrl.create({
      title: 'Cadastro realizado com sucesso!',
      subTitle: 'Parabéns por se cadastrar em nossa base de dados senhor diretor(a).',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertErro() {
    let alert = this.alertCadastroCtrl.create({
      title: 'Cadastro não realizado.',
      subTitle: 'Algun campo no cadastro está errado e/ou cpf já cadastrado.',
      buttons: ['OK']
    });
    alert.present();
  }
}