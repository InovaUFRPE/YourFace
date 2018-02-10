import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})

export class RelatorioPage {
  items: any;
  lista: any;
  idTurma: string;
  nome: string;


  chartOptions:any;
  nomeDisc: string;
  Total = 0;
  faltasTotal = 0;
  presensaTotal = 0;

  constructor(public navCtrl: NavController,public navParams: NavParams,public alertCtrl: AlertController,public restProvider: ServiceProvider) {
    this.idTurma = this.navParams.get("idTurma");
    this.nome = this.navParams.get("nomeTurma");
    this.inicializaLista();
  }

  inicializaLista() {
    //frequencia_turma_Aluno
    console.log(this.idTurma)

    /*
    this.restProvider.getApi('frequencia_turma_Aluno_turma/'+this.idTurma).then(data => {
      this.lista = JSON.parse(data['_body']);
      if (this.lista[0]!= null) {
        this.initializeItems();
      }
    });*/
    this.restProvider.getApi('frequencia_turma_Aluno_turma/'+this.idTurma).then(data => {
      const lista = JSON.parse(data['_body']);
      if (lista[0]!= null) {
        this.nomeDisc=lista[0]['name_turma'];
        for (const key in lista) {
          this.Total =this.Total+1;
          const element = lista[key];
          for (const key in element) {
            if (key =='presenca') {
              if (element[key]=='1') {
                this.presensaTotal = this.presensaTotal+1;
              }else{
                this.faltasTotal = this.faltasTotal+1;
              }
            }
          }
        }
        this.initializeItems();
      }
    });
  }




  initializeItems() {
    console.log(this.faltasTotal,this.presensaTotal,this.Total);
    this.chartOptions = {
      chart:{
        type:'column'
      },
      title:{
        text:'Frequencia'
      },
      xAxis:{
        categories:['Faltas','Presença','total']
      },
      yAxis:{
        title:{
          text:''
        }
      },
      series:[{
        name:this.nomeDisc,
        data:[this.faltasTotal,this.presensaTotal,this.Total]
      }]
    }
  }


/*
  initializeItems() {
    this.items = this.lista;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    console.log(val)
  }

  deletarUser(user) {}
  editarUser(user) {}
*/
}
