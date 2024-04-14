import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.scss'
})
export class RegistrarPacienteComponent implements OnInit{
  registroPacienteForm!: FormGroup

  ngOnInit(){
    this.registrarPaciente()
};
  registrarPaciente() {
    this.registroPacienteForm = new FormGroup({
      nome: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genero: new FormControl('',[
        Validators.required
      ]),                       
      dataNascimento: new FormControl('',[
        Validators.required
      ]),                       //validar range
      cpf: new FormControl('',[
        Validators.required
      ]), //formato
      rg: new FormControl('',[
        Validators.required,
        Validators.maxLength(20)
      ]),
      estadoCivil: new FormControl('',[
        Validators.required
      ]),
      telefone: new FormControl('',[
        Validators.required
      ]), //formato (99) 9 9999-9999
      email: new FormControl('',[
        Validators.email
      ]), 
      naturalidade: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      contatoEmergencia: new FormControl('',[
        Validators.required
      ]), //formato tele
      cuidados: new FormControl(''),
      alergias: new FormControl(''),
      convenio: new FormControl(''),
      nConvenio: new FormControl(''),
      validadeConvenio: new FormControl(''),
      cep: new FormControl('',[
        Validators.required
      ]),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl('',[
        Validators.required
      ]),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      referencia: new FormControl('')


    })
  }
  


}
