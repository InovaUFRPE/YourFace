import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-frequencia-aluno',
  templateUrl: 'frequencia-aluno.html',
})
export class FrequenciaAlunoPage {
  UrlApi= 'http://localhost:3000/';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: ServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrequenciaAlunoPage');
    /*
    this.restProvider.getApi(this.UrlApi+'professores').then(data => {
      const lista = JSON.parse(data['_body']);
      if (lista[0]!= null) {}
    });*/
  }

}
