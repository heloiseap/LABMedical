import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExameService } from '../../mod-exame/exame.service';
import { PacienteService } from '../../mod-paciente/paciente.service';

@Component({
  selector: 'app-registrar-exame',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-exame.component.html',
  styleUrl: './registrar-exame.component.scss',
})
export class RegistrarExameComponent implements OnInit {
  registroExameForm!: FormGroup;
  pacienteEncontrado: boolean = true;
  exame = {};
  paciente: any;

  constructor(
    private pacienteService: PacienteService,
    private exameService: ExameService
  ) {}
  ngOnInit(): void {
    this.registroExameForm = new FormGroup({
      pacienteNome: new FormControl('', [Validators.required]),
      nomeExame: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      dataExame: new FormControl('', [Validators.required]),
      horarioExame: new FormControl('', [Validators.required]),
      tipoExame: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      laboratorio: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      urlDocumento: new FormControl('', []),
      resultado: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
    });
  }

  procurarPaciente() {
    this.paciente =
      this.pacienteService.buscarPaciente(
        this.registroExameForm.controls.pacienteNome.value
      ) || '';
    if (this.paciente.length != 0) {
      this.pacienteEncontrado = true;
      return this.pacienteEncontrado;
    } else {
      this.pacienteEncontrado = false;
      return false;
    }
  }
  registrarExame() {
    this.procurarPaciente()
    if (this.registroExameForm.valid && this.procurarPaciente()) {
      confirm('Confirma os dados?');
      this.exame = {
        nomeExame: this.registroExameForm.controls.nomeExame.value,
        dataExame: this.registroExameForm.controls.dataExame.value,
        horarioExame: this.registroExameForm.controls.horarioExame.value,
        tipoExame: this.registroExameForm.controls.tipoExame.value,
        laboratorio: this.registroExameForm.controls.laboratorio.value,
        urlDocumento: this.registroExameForm.controls.urlDocumento.value,
        resultado: this.registroExameForm.controls.resultado.value,
        idPaciente: this.paciente[0].id,
      };
      this.exameService.adicionarExame(this.exame);
      alert('Consulta registrada com sucesso');
    } else {
      this.procurarPaciente();
      this.registroExameForm.markAllAsTouched();
    }
  }
}
