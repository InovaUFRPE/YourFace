import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cadastro-aluno',
  templateUrl: 'cadastro-aluno.html',
})
export class CadastroAlunoPage {

  public dados = {
    nomeUsuario : null,
    cpf : null,
    senha : null,
    senhaConf : null,
    curso : null,
    email : null,
    emailConf: null,
    idade : null,

  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCadastroCtrl: AlertController ) {
  }

  public fazerCadastro(): void {
    // Pega as informações do usuário
    var nomeUsuario = this.dados.nomeUsuario;
    var cpf = this.dados.cpf;
    var email = this.dados.email;
    var curso = this.dados.curso;
    var emailConf = this.dados.emailConf;
    var senha = this.dados.senha;
    var SenhaConf = this.dados.senhaConf;
    var idade = this.dados.idade;

    if (senha !== SenhaConf) {
      senha.innerText = '';
      SenhaConf.innerText = '';
      senha.focus();
      alert('As senhas não são iguais.')
      return;
    }

    // Compara se os e-mails digitados são correspondentes
    if (email !== emailConf) {
      email.innerText = '';
      emailConf.innerText = '';
      email.focus();
      alert('E-mails não são iguais.');
      return;
    }

    var usuario: object = {
      username: nomeUsuario,
      password: senha,
      email: email
    };

    this.navCtrl.push(HomePage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroAlunoPage');
  }

}
