import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-abrir-turma-professor',
  templateUrl: 'abrir-turma-professor.html',
})
export class AbrirTurmaProfessorPage {
  UrlApi= 'http://localhost:3000/'
  turma: any;
	disciplina: any;
  lista: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: ServiceProvider) {
    this.inicializaLista();
  }

  inicializaLista() {
    this.restProvider.getApi(this.UrlApi+'turma/'+localStorage.getItem("id_prof")).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }
  initializeItems() {
    this.disciplina = this.lista;
    //this.disciplina = [{id:1,name:'Matemativa'},{id:2,name:'Quimica'},{id:3,name:'Fisica'}];
  }

  AbrirTurma(){
    if(this.turma!=null){
      this.restProvider.getApi(this.UrlApi+'abrirAta/'+this.turma).then(data => {});
    }
  }

}
