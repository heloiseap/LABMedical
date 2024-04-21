import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConsultaService } from '../../mod-consulta/consulta.service';

@Component({
  selector: 'app-registrar-consulta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-consulta.component.html',
  styleUrl: './registrar-consulta.component.scss',
})
export class RegistrarConsultaComponent implements OnInit {
  registroConsultaForm!: FormGroup;
  consulta = {};

  constructor(private consultaService: ConsultaService) {}

  ngOnInit() {
    this.registroConsultaForm = new FormGroup({
      motivo: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      data: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
      medicacao: new FormControl(''),
      dosagemPrecaucoes: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(256),
      ]),
    });
  }

  registrarConsulta() {
    if (this.registroConsultaForm.valid) {
      this.consulta = {
        motivo: this.registroConsultaForm.controls.motivo.value,
        data: this.registroConsultaForm.controls.data.value,
        horario: this.registroConsultaForm.controls.horario.value,
        descricao: this.registroConsultaForm.controls.descricao.value,
        medicacao: this.registroConsultaForm.controls.medicacao.value,
        dosagemPrecaucoes:
          this.registroConsultaForm.controls.dosagemPrecaucoes.value,
      };
      this.consultaService.registrarConsulta(this.consulta);
    }
  }
}
