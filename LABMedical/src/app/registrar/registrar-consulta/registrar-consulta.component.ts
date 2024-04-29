import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConsultaService } from '../../mod-consulta/consulta.service';
import { PacienteService } from '../../mod-paciente/paciente.service';


@Component({
  selector: 'app-registrar-consulta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-consulta.component.html',
  styleUrl: './registrar-consulta.component.scss',
})
export class RegistrarConsultaComponent implements OnInit {
  registroConsultaForm!: FormGroup;
  consulta = {
    motivo:'',
    data: '',
    horario: '',
    descricao: '',
    medicacao: 'N/A',
    dosagemPrecaucoes: '',
    idPaciente: ''
  };

  paciente: any
  pacienteEncontrado: boolean = true
  constructor(private consultaService: ConsultaService, private pacienteService: PacienteService) {}

  procurarPaciente(){
    this.paciente = this.pacienteService.buscarPaciente(this.registroConsultaForm.controls.paciente.value) || '';
    if(this.paciente.length!=0){
      this.pacienteEncontrado = true
      return this.pacienteEncontrado  
    } else {
      this.pacienteEncontrado = false
      return false
    }
  }

  ngOnInit() {


    this.registroConsultaForm = new FormGroup({
      paciente: new FormControl('',[
        Validators.required
      ]),
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
    this.procurarPaciente()
    if (this.registroConsultaForm.valid && this.procurarPaciente()) {
      confirm("Confirma os dados?")
      this.consulta = {
        motivo: this.registroConsultaForm.controls.motivo.value,
        data: this.registroConsultaForm.controls.data.value,
        horario: this.registroConsultaForm.controls.horario.value,
        descricao: this.registroConsultaForm.controls.descricao.value,
        medicacao: this.registroConsultaForm.controls.medicacao.value,
        dosagemPrecaucoes:
          this.registroConsultaForm.controls.dosagemPrecaucoes.value,
        idPaciente: this.paciente[0].id
      };
      this.consultaService.registroConsulta(this.consulta);
      alert("Consulta registrada com sucesso")

    } else{
      this.procurarPaciente()
      this.registroConsultaForm.markAllAsTouched()
    }
  }
}
