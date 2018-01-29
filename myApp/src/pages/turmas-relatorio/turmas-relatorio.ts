import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { RelatorioPage } from '../relatorio/relatorio';

@IonicPage()
@Component({
  selector: 'page-turmas-relatorio',
  templateUrl: 'turmas-relatorio.html',
})
export class TurmasRelatorioPage {
  items: any;
  lista: any;

  constructor(public navCtrl: NavController,public navParams: NavParams,public alertCtrl: AlertController,public restProvider: ServiceProvider) {
    this.inicializaLista();
  }

  inicializaLista() {
    this.restProvider.getApi('turma').then(data => {
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
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.cpf_aluno.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  abrirRelatorio(nome, id){
    this.navCtrl.push(RelatorioPage, {'idTurma': id,'nomeTurma':nome})
  }
}
