import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { List } from 'ionic-angular/components/list/list';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";



@IonicPage()
@Component({
  selector: 'page-listar-alunos',
  templateUrl: 'listar-alunos.html',
})
export class ListarAlunosPage {
  UrlApi = "http://localhost:3000/";
  items: any;
  lista: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http) {
    this.inicializaLista();
  }

  inicializaLista() {
    this.http.get(this.UrlApi+'alunos',this.createRequestOptions()).map(res => res.json())
      .subscribe(res => {
        this.lista = res;
        if(res[0]!= null){
          this.initializeItems();
        }
      }, (error) => {
        console.error("erro " + error);
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
        return (item.cpf.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  deletarUser(user) {
    let prompt = this.alertCtrl.create({
      title: 'Deletar aluno!',
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

            this.http.delete(this.UrlApi+'alunos/' + data.cpf, this.createRequestOptions()).map(res => res.json())
              .subscribe(res => {
                console.log(res)
                this.inicializaLista();
              }, (error) => {
                console.error("erro " + error);
              });
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
    
            this.http.put(this.UrlApi+'alunos/'+data.cpf, data, this.createRequestOptions()).map(res => res.json())
              .subscribe(res => {
                this.inicializaLista();
              }, (error) => {
                console.log("erro " + error);
              });
          }
        }
      ]
    });
    prompt.present();
  }

  private createRequestOptions() {
    let headers = new Headers();
    headers.append("Authorization", 'JWT '+ localStorage.getItem("token"));
    headers.append("Content-Type", "application/json");
    return new RequestOptions({ headers: headers });
  }
}
