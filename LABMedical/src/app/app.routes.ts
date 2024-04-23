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
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    pathMatch: 'full'
  },
  {
    path: 'prontuarios',
    children: [
      {
        path: '',
        component: ProntuariosComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: ProntuarioPacienteComponent,
        pathMatch: 'full'
      }
    ]

  },
  {
    path: 'registrar',
    children: [
      {
        path: '',
        component: RegistrarComponent,
        pathMatch: 'full'
      },
      {
        path: 'exame',
        component: RegistrarExameComponent,
        pathMatch: 'full'
      },
      {
        path: 'consulta',
        component: RegistrarConsultaComponent,
        pathMatch: 'full'
      },
      {
        path: 'paciente',
        component: RegistrarPacienteComponent,
        pathMatch: 'full'
      },
    ],
  },

];
