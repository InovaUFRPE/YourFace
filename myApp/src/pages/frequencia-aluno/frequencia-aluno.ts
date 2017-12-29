import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-frequencia-aluno',
  templateUrl: 'frequencia-aluno.html',
})
export class FrequenciaAlunoPage {
  UrlApi= 'http://localhost:3000/'
  items: any;
  lista: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: ServiceProvider
  ) {this.inicializaLista();}

  inicializaLista() {
    this.restProvider.getApi(this.UrlApi+'frequencia_turma_Aluno/'+localStorage.getItem("token")).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }
  initializeItems() {
    this.items = this.lista;
  }

  ionViewDidLoad() {}

}
