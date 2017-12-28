import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {

  UrlApi= 'http://localhost:3000/';
  items: any;
  lista: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public restProvider: ServiceProvider
  ) {this.inicializaLista();}

  inicializaLista() {

    this.restProvider.getApi(this.UrlApi+'frequencia').then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });

  }

  initializeItems() {
    this.items = this.lista;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.cpf_aluno.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  deletarUser(user) {
    let prompt = this.alertCtrl.create({
      title: 'Deletar professor!',
      inputs: [
        {
          name: 'cpf',
          placeholder: 'cpf',
          value: user.cpf
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }

        },
        {
          text: 'Deletar',
          handler: data => {
            console.log('Deletar clicked');

            /*this.http.delete(this.UrlApi+'professores/' + data.cpf, this.createRequestOptions()).map(res => res.json())
              .subscribe(res => {
                this.inicializaLista();
              }, (error) => {
                console.error("erro " + error);
              });*/


            }
        }
      ]
    });
    prompt.present();
  }



  editarUser(user) {
    let prompt = this.alertCtrl.create({
      title: 'Edita Perfil',
      inputs: [
        {
          name: 'name',
          placeholder: 'nome',
          value: user.name
        },
        {
          name: 'cpf',
          placeholder: 'cpf',
          value: user.cpf
        },
        {
          name: 'email',
          placeholder: 'email',
          value: user.email
        },
        {
          name: 'password',
          placeholder: 'password',
          value: user.password
        }

      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }

        },
        {
          text: 'Salvar',
          handler: data => {
            console.log('Saved clicked');


            /*this.http.put(this.UrlApi+'professores/'+data.cpf, data, this.createRequestOptions()).map(res => res.json())
              .subscribe(res => {
                this.inicializaLista();
              }, (error) => {
                console.log("erro " + error);
              });
           

            this.restProvider.putApi(this.UrlApi+'professores/'+data.cpf, data).then((result) => {
              console.log(result);
              this.inicializaLista();
            }, (err) => {
              console.log(err);
              console.log("erro " + err);
            });
            */

          }
        }
      ]
    });
    prompt.present();
  }

}
