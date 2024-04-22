import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PacienteService } from '../../mod-paciente/paciente.service';
import { ConsultaService } from '../../mod-consulta/consulta.service';
import { ExameService } from '../../mod-exame/exame.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prontuario-paciente',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './prontuario-paciente.component.html',
  styleUrl: './prontuario-paciente.component.scss',
})
export class ProntuarioPacienteComponent implements OnInit {
  id: string = '';
  naoTemExames = true;
  naoTemConsultas = true;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private exameService: ExameService
  ) {}
  paciente: any
  consultas: any
  exames: any
  numId: number = 0
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.mostrarPronturario(this.id)
  }

  mostrarPronturario(id: string) {
    this.numId = parseInt(id)
    this.paciente = this.pacienteService.buscarPacienteId(id)
    this.consultas = this.consultaService.buscarConsultas(id)
    this.exames = this.exameService.buscarExames(id)


    for (var i in this.consultas){
      if (this.consultas[i]!=''){
        this.naoTemConsultas = false
        break
      }
    }

    for (var i in this.exames){
      if (this.exames[i]!=''){
        this.naoTemExames = false
        break
      }
    }

    console.log(this.naoTemExames,this.naoTemConsultas)
  } 
}
