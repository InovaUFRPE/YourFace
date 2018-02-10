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

  public aluno = {
    name: null,
    cpf: null,
    ativo: null,
  };

  faltasTotal = 0;

  constructor(public navCtrl: NavController,public navParams: NavParams,public restProvider: ServiceProvider) {
    this.aluno.name = this.navParams.get("parametro1")['user']['name'];
    this.aluno.cpf = this.navParams.get("parametro1")['user']['cpf'];
    this.aluno.ativo = this.navParams.get("parametro1")['user']['ativo'];
    this.inicializaLista();
  }
  inicializaLista() {
    this.restProvider.getApi('frequencia_turma_Aluno/'+this.aluno.cpf).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        //modo magaiver
        for (const key in this.lista) {
          const element = this.lista[key];
          for (const key in element) {

            if (key =='presenca') {
              if (element[key]=='1') {
                element[key] ='Presente';
              }else{
                this.faltasTotal = this.faltasTotal+1;
                element[key] = 'Falta';
              }
            }
          }
        }

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

  goToFrequNcia(){
    console.log(this.items)
  }
}
