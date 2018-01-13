import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';

import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { InfomacaoDiretorPage } from '../pages/infomacao-diretor/infomacao-diretor';
import { RemoverUsuariosPage } from '../pages/remover-usuarios/remover-usuarios';

import { CadastroAlunoPage } from '../pages/cadastro-aluno/cadastro-aluno';
import { LoginAlunoPage } from '../pages/login-Aluno/login-Aluno';

import { FrequenciaAlunoPage } from '../pages/frequencia-aluno/frequencia-aluno';

import { ListarAlunosPage } from '../pages/listar-alunos/listar-alunos';

import { RelatorioPage } from '../pages/relatorio/relatorio';

import { CadastroProfessorPage } from '../pages/cadastro-professor/cadastro-professor';
import { FrequenciaProfessorPage } from '../pages/frequencia-professor/frequencia-professor';
import { HomeProfessorPage } from '../pages/home-professor/home-professor';
import { ListarProfessorPage } from '../pages/listar-professor/listar-professor';

import { ServiceProvider } from '../providers/service/service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    CadastroPage,
    CadastroAlunoPage,
    CadastroProfessorPage,
    FrequenciaProfessorPage,
    InfomacaoDiretorPage,
    RelatorioPage,
    HomeProfessorPage,
    LoginPage,
    LoginAlunoPage,
    RemoverUsuariosPage,
    ListarAlunosPage,
    ListarProfessorPage,
    FrequenciaAlunoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    CadastroPage,
    CadastroAlunoPage,
    CadastroProfessorPage,
    FrequenciaProfessorPage,
    InfomacaoDiretorPage,
    RelatorioPage,
    HomeProfessorPage,
    LoginPage,
    LoginAlunoPage,
    RemoverUsuariosPage,
    ListarAlunosPage,
    ListarProfessorPage,
    FrequenciaAlunoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider 
  ]
})
export class AppModule {}
