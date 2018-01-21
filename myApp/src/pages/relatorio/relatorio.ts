import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})

export class RelatorioPage {
  items: any;
  lista: any;
  idTurma: string;
  nome: string;

  constructor(public navCtrl: NavController,public navParams: NavParams,public alertCtrl: AlertController,public restProvider: ServiceProvider) {
    this.idTurma = this.navParams.get("idTurma");
    this.nome = this.navParams.get("nomeTurma");
    this.inicializaLista();
  }

  inicializaLista() {
    //frequencia_turma_Aluno
    console.log(this.idTurma)
    this.restProvider.getApi('frequencia_turma_Aluno_turma/'+this.idTurma).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });

  }
  initializeItems() {
    this.items = this.lista;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    console.log(val)
  }

  deletarUser(user) {}
  editarUser(user) {}

}
