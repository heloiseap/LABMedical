import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { ExameService } from '../services/exame.service';
import { ConsultaService } from '../services/consulta.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalculoIdadePipe } from '../pipes/calculo-idade.pipe';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CalculoIdadePipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  
  constructor(
    private consultaService: ConsultaService,
    private exameService: ExameService,
    private pacienteService: PacienteService
  ) {}

  numPacientes: number = this.pacienteService.quantidadePacientes();
  numConsultas: number = this.consultaService.quantidadeConsultas();
  numExames: number = this.exameService.quantidadeExames();
  pacienteLista = this.pacienteService.pegarDez();
  exibirParcial = true

  ngOnInit(): void {
  }

  pesquisa: string = '';

  buscarPaciente() {
    this.pacienteLista = this.pacienteService.buscarPaciente(this.pesquisa);
  }

  limparPesquisa() {
    this.pacienteLista = [];
  }

  mostrarTodos(){
    this.pacienteLista = this.pacienteService.pegarTodos()
    this.exibirParcial = false
  }

}
