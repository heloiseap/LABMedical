import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ProntuariosComponent } from './prontuarios/prontuarios.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { RegistrarExameComponent } from './registrar/registrar-exame/registrar-exame.component';
import { RegistrarConsultaComponent } from './registrar/registrar-consulta/registrar-consulta.component';
import { RegistrarPacienteComponent } from './registrar/registrar-paciente/registrar-paciente.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProntuarioPacienteComponent } from './prontuarios/prontuario-paciente/prontuario-paciente.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'prontuarios',
    children: [
      {
        path: '',
        component: ProntuariosComponent,
      },
      {
        path: ':id',
        component: ProntuarioPacienteComponent,
      }
    ]

  },
  {
    path: 'registrar',
    children: [
      {
        path: '',
        component: RegistrarComponent,
      },
      {
        path: 'exame',
        component: RegistrarExameComponent,
      },
      {
        path: 'consulta',
        component: RegistrarConsultaComponent,
      },
      {
        path: 'paciente',
        component: RegistrarPacienteComponent,
      },
    ],
  },

];
