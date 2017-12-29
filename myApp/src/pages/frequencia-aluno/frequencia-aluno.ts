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
  Aluno:any;
  items: any;
  lista: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: ServiceProvider
  ) {this.inicializaLista();}

  inicializaLista() {
    //http://localhost:3000/frequencia_turma_Aluno/07136887429
    this.restProvider.getApi(this.UrlApi+'frequencia_turma_Aluno/'+localStorage.getItem("token")).then(data => {
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
