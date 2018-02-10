import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-cadastra-disciplina',
  templateUrl: 'cadastra-disciplina.html',
})
export class CadastraDisciplinaPage {
  professores: any;
  lista: any;

  cpf_prof:string;
  name_disciplina:string;

  constructor(public navCtrl: NavController,public alertLoginCtrl: AlertController, public navParams: NavParams, public restProvider: ServiceProvider) {
    this.inicializaLista();
  }
  inicializaLista() {
    this.restProvider.getApi('professores').then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });
  }
  initializeItems() {
    this.professores = this.lista;
  }

  cadastraturma(){

    if(this.cpf_prof != null && this.name_disciplina != null){
      this.restProvider.postApi('turma', {cpf_prof: this.cpf_prof,"name_turma":this.name_disciplina}).then((result) => {
        this.showAlert()
        this.navCtrl.push(HomePage);
      }, (err) => {
        console.log(err);
      });
    }else{
      this.showAlertErro();
    }
  }
  showAlert() {
    let alert = this.alertLoginCtrl.create({
      title: 'Cadastro realizado com sucesso!',
      subTitle: 'Parabéns disciplina cadastrada em nossa base de dados.',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertErro() {
    let alert = this.alertLoginCtrl.create({
      title: 'Cadastro não Realizado.',
      subTitle: 'Campos Vazios.',
      buttons: ['OK']
    });
    alert.present();
  }

}
