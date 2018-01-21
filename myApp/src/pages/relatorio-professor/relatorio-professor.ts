import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-relatorio-professor',
  templateUrl: 'relatorio-professor.html',
})
export class RelatorioProfessorPage {
  Disc: string;
  Prof: string;
  nomeDisc: string;

  chartOptions:any;

  Total = 0;
  faltasTotal = 0;
  presensaTotal = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: ServiceProvider) {
    this.Prof = this.navParams.get("prof");
    this.Disc = this.navParams.get("disc");
    this.nomeDisc = this.navParams.get("nome");
    this.inicializaLista();
  }

  inicializaLista() {
    this.restProvider.getApi('frequencia_turma_Aluno_prof_turma/'+this.Prof+'/'+this.Disc).then(data => {
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

}
