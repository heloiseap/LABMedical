import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../mod-paciente/paciente.service';
import { ExameService } from '../mod-exame/exame.service';
import { ConsultaService } from '../mod-consulta/consulta.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
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
  pacienteLista = this.pacienteService.pegarNove();

  ngOnInit(): void {

  }

  nomePesquisa: string = ''

  buscarPaciente() {
    this.pacienteLista = this.pacienteService.buscarPaciente(this.nomePesquisa)
  }

  limparPesquisa() {
    this.pacienteLista = this.pacienteService.pegarNove()
  }
}
