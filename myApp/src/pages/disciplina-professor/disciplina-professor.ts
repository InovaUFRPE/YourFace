import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

import { FrequenciaProfessorPage } from '../frequencia-professor/frequencia-professor';

@IonicPage()
@Component({
  selector: 'page-disciplina-professor',
  templateUrl: 'disciplina-professor.html',
})
export class DisciplinaProfessorPage {
  items: any;
  lista: any;
  tipo: string;
  Prof: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: ServiceProvider) {
    this.tipo = this.navParams.get("tipo");
    this.Prof = this.navParams.get("prof");
    this.inicializaLista();
  }

  inicializaLista() {
    this.restProvider.getApi('turma/'+this.Prof).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }

  initializeItems() {
    this.items = this.lista;
  }

  ionViewDidLoad() {
    console.log(this.tipo);
  }

  goToChamadaPage(nome, id){
    if(this.tipo==='B'){
      //this.navCtrl.push( ,{'prof':this.Prof,'disc':id});
    }else{
      this.navCtrl.push(FrequenciaProfessorPage,{'prof':this.Prof,'disc':id});
    }
  }

}
