import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-frequencia-professor',
  templateUrl: 'frequencia-professor.html',
})
export class FrequenciaProfessorPage {

  items: any;
  lista: any;
  Disc:any;
  Prof: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams,public restProvider: ServiceProvider) {
    this.Prof = this.navParams.get("prof");
    this.Disc = this.navParams.get("disc");
    this.inicializaLista();
  }

  inicializaLista() {
    console.log(this.Prof+'/'+this.Disc)
    this.restProvider.getApi('frequencia_turma_Aluno_prof_turma/'+this.Prof+'/'+this.Disc).then(data => {
      this.lista = JSON.parse(data['_body']);
      console.log(this.lista)
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

  falta(user) {
    let prompt = this.alertCtrl.create({
      title: 'Colocar falta no Aluno?',

      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }

        },
        {
          text: 'Confirma',
          handler: data => {
            console.log('Deletar clicked');
            console.log(user)

            //frequencia/:id_freq

            this.restProvider.deleteApi('frequenciaId/' + user.id_freq).then(data => {
              console.log(user.id_freq)
              this.inicializaLista();
            });


            }
        }
      ]
    });
    prompt.present();
  }
  presente(user) {
    let prompt = this.alertCtrl.create({
      title: 'Colocar Presença?',

      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }

        },
        {
          text: 'Confirmar',
          handler: data => {
            console.log('Saved clicked');
            this.restProvider.putApi('frequenciaId/'+user.id_freq, {"presenca":true}).then((result) => {
              console.log(result);
              this.inicializaLista();
            }, (err) => {
              console.log(err);
              console.log("erro " + err);
            });


          }
        }
      ]
    });
    prompt.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FrequenciaProfessorPage');
  }

}
