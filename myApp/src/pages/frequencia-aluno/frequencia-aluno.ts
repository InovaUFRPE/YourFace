import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { IntroPage } from '../intro/intro';


@IonicPage()
@Component({
  selector: 'page-frequencia-aluno',
  templateUrl: 'frequencia-aluno.html',
})
export class FrequenciaAlunoPage {
  items: any;
  lista: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: ServiceProvider
  ) {this.inicializaLista();}


  inicializaLista() {
    this.restProvider.getApi('frequencia_turma_Aluno/'+localStorage.getItem("token")).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }
  initializeItems() {
    this.items = this.lista;
  }

  sair() {
    localStorage.clear();
    this.navCtrl.setRoot(IntroPage);
  }
}
