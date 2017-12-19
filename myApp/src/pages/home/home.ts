import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { LoginPage } from '../login/login';
import { RelatorioPage } from '../relatorio/relatorio';
import { CadastroProfessorPage } from '../cadastro-professor/cadastro-professor';
import { CadastroAlunoPage } from '../cadastro-aluno/cadastro-aluno';

import { ListarAlunosPage } from '../listar-alunos/listar-alunos';
import { ListarProfessorPage } from '../listar-professor/listar-professor';

import { RemoverUsuariosPage } from '../remover-usuarios/remover-usuarios';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertHomeCtrl:AlertController) {
  }
  

  abrirCadastroAluno(){
    this.navCtrl.push(CadastroAlunoPage)
  }
  goToCadastroPage() {
    this.navCtrl.push(CadastroPage);
  }

  abrirCadastroProfessor(){
    this.navCtrl.push(CadastroProfessorPage)
  }

  abrirRelatorio(){
    this.navCtrl.push(RelatorioPage)
  }

  sair(){
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage)
  }

  removerUsuarios(){
    this.navCtrl.push(RemoverUsuariosPage)
  }

  listarAlunos(){
    this.navCtrl.push(ListarAlunosPage)
  }
  listarProfessor() {
    this.navCtrl.push(ListarProfessorPage)
  }
}
