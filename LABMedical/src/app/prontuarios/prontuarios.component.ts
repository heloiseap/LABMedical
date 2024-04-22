import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../mod-paciente/paciente.service';
import { ConsultaService } from '../mod-consulta/consulta.service';
import { ExameService } from '../mod-exame/exame.service';

@Component({
  selector: 'app-prontuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './prontuarios.component.html',
  styleUrl: './prontuarios.component.scss',
})
export class ProntuariosComponent {
  constructor(
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private exameService: ExameService,
    private router: Router
  ) {}

  pesquisa: string = '';
  listaPacientes: any;
  mostrar = false;

  mostrarTodos() {
    this.listaPacientes = this.pacienteService.pegarTodos();
    this.mostrar = true;
  }
  buscarPaciente() {
    this.listaPacientes = this.pacienteService.buscarPaciente(this.pesquisa);
    this.mostrar = true;
  }

  limparPesquisa() {
    this.listaPacientes = {};
    this.mostrar = false;
  }

  navegarDetalhamento(id:string){
    this.router.navigate(['/',id])
  }

  exibirProntuario() {}
}
