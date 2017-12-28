import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-frequencia-aluno',
  templateUrl: 'frequencia-aluno.html',
})
export class FrequenciaAlunoPage {
  UrlApi= 'http://localhost:3000/alunos_frequencia/'+localStorage.getItem("token");
  items: any;
  lista: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: ServiceProvider
  ) {this.inicializaLista();}

  inicializaLista() {
    console.log(this.UrlApi)
    this.restProvider.getApi(this.UrlApi).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }
  initializeItems() {
    this.items = this.lista;
    console.log(this.items);
  }

  ionViewDidLoad() {
/*
    this.restProvider.getApi(this.UrlApi).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });*/
    

    /*
    this.restProvider.getApiFrequencia(this.UrlApi+'professores').then(data => {
      const lista = JSON.parse(data['_body']);
      if (lista[0]!= null) {}
    });*/
  }

}
