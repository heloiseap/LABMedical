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
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
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
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: ':id',
        component: ProntuarioPacienteComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      }
    ]

  },
  {
    path: 'registrar',
    children: [
      {
        path: '',
        component: RegistrarComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'exame',
        component: RegistrarExameComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'consulta',
        component: RegistrarConsultaComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'paciente',
        component: RegistrarPacienteComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
    ],
  },
  {
    path: 'reset-senha',
    component: ResetSenhaComponent,
    pathMatch: 'full'
  }

];
