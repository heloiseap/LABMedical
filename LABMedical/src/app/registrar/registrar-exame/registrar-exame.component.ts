import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  pacienteEncontrado: boolean = true
  exame = {}
  paciente: any;
  // exame = {
  //   nomeExame:'',
  //   dataExame:'',
  //   horarioExame:'',
  //   tipoExame:'',
  //   laboratorio:'',
  //   urlDocumento: '',
  //   resultado: ''
  // }
  constructor(private pacienteService:PacienteService ){}
  ngOnInit(): void {
    this.registroExameForm = new FormGroup({
      paciente: new FormControl('', [Validators.required]),
      nomeExame: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      dataExame: new FormControl('',[
        Validators.required
      ]),
      horarioExame: new FormControl('',[
        Validators.required
      ]),
      tipoExame: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      laboratorio: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      urlDocumento: new FormControl('',[]),
      resultado: new FormControl('',[
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024)
      ]),
    });
  }

  procurarPaciente() {
    this.paciente =
      this.pacienteService.buscarPaciente(
        this.registroExameForm.controls.paciente.value
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
    if (this.registroExameForm.valid) {
      this.exame = {
        nomeExame: this.registroExameForm.controls.nomeExame,
        dataExame: this.registroExameForm.controls.dataExame,
        horarioExame: this.registroExameForm.controls.horarioExame,
        tipoExame: this.registroExameForm.controls.tipoExame,
        laboratorio: this.registroExameForm.controls.laboratorio,
        urlDocumento: this.registroExameForm.controls.urlDocumento,
        resultado: this.registroExameForm.controls.resultado,
        // idPaciente,
      }
    }

  }
}
