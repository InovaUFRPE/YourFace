import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomeProfessorPage } from '../home-professor/home-professor';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  UrlApi:any = 'http://localhost:3000/';
  
  public userCredenciais = {
    cpf: null,
    password: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertLoginCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public restProvider: ServiceProvider
  ) {}

  goToHomeProfessor(){
    this.restProvider.posLogintApi(this.UrlApi+'login/professores', this.userCredenciais).then((result) => {
      const Professor = JSON.parse(result['_body']);
      if (Professor.token) {
        localStorage.setItem("token", Professor.token);
        this.showAlert()
        this.navCtrl.push(HomeProfessorPage);
      }else{
        console.log("erro ", Professor.message);
        this.showAlertErro()
      }
    }, (err) => {
      console.log("Erro", err);
    });
  }  
  goToHomeCoordenador() {
    this.restProvider.posLogintApi(this.UrlApi+'login/coordenador', this.userCredenciais).then((result) => {
      const Professor = JSON.parse(result['_body']);
      if (Professor.token) {
        localStorage.setItem("token", Professor.token);
        this.showAlert()
        this.navCtrl.push(HomePage);
      }else{
        console.log("erro ", Professor.message);
        this.showAlertErro()
      }
    }, (err) => {
      console.log("Erro", err);
    });
  }

  showAlert() {
    let alert = this.alertLoginCtrl.create({
      title: 'Login realizado com sucesso!',
      subTitle: 'Parabéns por usar nosso software!',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertErro() {
    let alert = this.alertLoginCtrl.create({
      title: 'Login não realizado.',
      subTitle: 'Senha e/ou login errado.',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde por favor...",
      duration: 2000
      
    });
    loader.present();
  }
}