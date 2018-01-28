import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-abrir-turma-professor',
  templateUrl: 'abrir-turma-professor.html',
})
export class AbrirTurmaProfessorPage {
  turma: any;
	disciplina: any;
  lista: any;

  cpfProf: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: ServiceProvider) {
    this.cpfProf = this.navParams.get("cpf");
    console.log(this.navParams.get("cpf"))
    this.inicializaLista();
  }

  inicializaLista() {
    this.restProvider.getApi('turma/'+this.cpfProf).then(data => {
      this.lista = JSON.parse(data['_body']);
      console.log(this.lista);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }
  initializeItems() {
    this.disciplina = this.lista;
  }

  AbrirTurma(){
    if(this.turma!=null){
      this.restProvider.getApi('abrirAta/'+this.turma).then(data => {});
    }
  }

}
