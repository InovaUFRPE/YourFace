import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-infomacao-diretor',
  templateUrl: 'infomacao-diretor.html',
})
export class InfomacaoDiretorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfomacaoDiretorPage');
  }

}
