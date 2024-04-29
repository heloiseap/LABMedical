import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../mod-paciente/paciente.service';
import { ConsultaService } from '../mod-consulta/consulta.service';
import { ExameService } from '../mod-exame/exame.service';
import { CalculoIdadePipe } from '../pipes/calculo-idade.pipe';

@Component({
  selector: 'app-prontuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CalculoIdadePipe],
  templateUrl: './prontuarios.component.html',
  styleUrl: './prontuarios.component.scss',
})
export class ProntuariosComponent {
  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  pesquisa: string = '';
  listaPacientes: any;
  mostrar = false;
  resultadoVazio = false;

  mostrarTodos() {
    this.listaPacientes = this.pacienteService.pegarTodos();
    this.mostrar = true;
  }

  buscarPaciente() {
    this.listaPacientes = this.pacienteService.buscarPaciente(this.pesquisa);
    if (this.listaPacientes == undefined || this.listaPacientes == null) {
      this.resultadoVazio = true;
    }

    this.mostrar = true;
  }

  limparPesquisa() {
    this.listaPacientes = {};
    this.mostrar = false;
    this.resultadoVazio = false;
  }

  editarPaciente(id: string) {
    // console.log('ok')
    // this.router.navigate(['../registrar/paciente'+ {id}])
    // let editar = true
    //todo
  }

  excluirPaciente(idExcluir: string) {
    let pacienteExclusao = this.listaPacientes.filter((paciente: { id: string; }) => paciente.id == idExcluir)
    // this.listaPacientes.splice(paciente,1)
    
    //todo
  }
}
