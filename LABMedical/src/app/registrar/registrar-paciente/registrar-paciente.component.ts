import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';
import { PacienteService } from '../../mod-paciente/paciente.service';
import { CommonModule } from '@angular/common';
import { ValidadorCustomizadoService } from '../../services/validador-customizado.service';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.scss',
})
export class RegistrarPacienteComponent implements OnInit {
  registroPacienteForm!: FormGroup;
  endereco = {
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    referencia: '',
  };
  paciente = {
    id: 0,
    nome: '',
    genero: '',
    dataNascimento: '',
    CPF: 0,
    rg: '',
    estadoCivil: '',
    telefone: '',
    email: '',
    naturalidade: '',
    contatoEmergencia: '',
    nomeEmergencia: '',
    alergias: [],
    cuidadosEspecificos: [],
    convenio: '',
    numConvenio: '',
    valConvenio: '',
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: 0,
    complemento: '',
    bairro: '',
    pontoReferencia: ''   

  };
  constructor(
    private enderecoService: EnderecoService,
    private pacienteService: PacienteService,
    private validadorCustomizadoService: ValidadorCustomizadoService
  ) {}

  ngOnInit() {
    this.registroPacienteForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        this.validadorCustomizadoService.validacaoNomeCompleto(),
      ]),
      genero: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [
        Validators.required,
        // this.validadorCustomizadoService.validacaoCpf(),
        Validators.pattern(
          '([0-9]{2}[\\.\\-]?[0-9]{3}[\\.\\-]?[0-9]{3}[\\/\\-]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.\\-]?[0-9]{3}[\\.\\-]?[0-9]{3}[-]?[0-9]{2})'
        ),
      ]),
      rg: new FormControl('', [
        Validators.required,
        this.validadorCustomizadoService.validacaoRg(),
      ]),
      estadoCivil: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^\\(?[1-9]{2}\\)? ?(?:[2-8]|9 [0-9])[0-9]{3}-?[0-9]{4}$'
        ),
      ]),
      email: new FormControl('', [Validators.email]),
      naturalidade: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      contatoEmergencia: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '([0-9]{2}[\\.\\-]?[0-9]{3}[\\.\\-]?[0-9]{3}[\\/\\-]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.\\-]?[0-9]{3}[\\.\\-]?[0-9]{3}[-]?[0-9]{2})'
        ),
      ]),
      emergenciaNome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      cuidados: new FormControl(''),
      alergias: new FormControl(''),
      convenio: new FormControl(''),
      nConvenio: new FormControl(''),
      validadeConvenio: new FormControl(''),
      cep: new FormControl('', [
        Validators.required,
        this.validadorCustomizadoService.validacaoCep(),
      ]),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      referencia: new FormControl(''),
    });
  }

  pesquisarCep(): void {
    if (
      !!this.registroPacienteForm.controls.cep.errors &&
      !!this.registroPacienteForm.controls.cep.value
    ) {
      this.enderecoService
        .pegarEndereco(this.registroPacienteForm.controls['cep'].value)
        .subscribe((data: any) => {
          this.endereco = {
            cep: data.cep,
            cidade: data.localidade,
            estado: data.uf,
            logradouro: data.logradouro,
            numero: '',
            complemento: '',
            bairro: '',
            referencia: '',
          };
          this.registroPacienteForm.patchValue({
            cidade: this.endereco.cidade,
            estado: this.endereco.estado,
            logradouro: this.endereco.logradouro,
          });
        });
    } else {
      alert('Digite um CEP valido');
    }
  }

  registrarPaciente() {
    this.pacienteService.adicionarPaciente(this.paciente);
    // if (this.registroPacienteForm.valid) {
    //   //confirm('aceitar dados')
    //   let nomeInserido = this.registroPacienteForm.controls['nome'].value;

    //   if (this.pacienteService.buscarPaciente(nomeInserido).length === 0) {
    //     this.paciente = {
    //       id: 0, //como add isso
    //       nome: this.registroPacienteForm.controls['nome'].value,
    //       genero: this.registroPacienteForm.controls['genero'].value,
    //       dataNascimento:
    //         this.registroPacienteForm.controls['dataNascimento'].value,
    //       CPF: this.registroPacienteForm.controls['cpf'].value,
    //       rg: this.registroPacienteForm.controls['rg'].value,
    //       estadoCivil: this.registroPacienteForm.controls['estadoCivil'].value,
    //       telefone: this.registroPacienteForm.controls['telefone'].value,
    //       email: this.registroPacienteForm.controls['email'].value,
    //       naturalidade:
    //         this.registroPacienteForm.controls['naturalidade'].value,
    //       contatoEmergencia:
    //         this.registroPacienteForm.controls['contatoEmergencia'].value,
    //       alergias: this.registroPacienteForm.controls['alergias'].value,
    //       cuidados: this.registroPacienteForm.controls['cuidados'].value,
    //       convenio: this.registroPacienteForm.controls['convenio'].value,
    //       nConvenio: this.registroPacienteForm.controls['nConvenio'].value,
    //       validadeConvenio:
    //         this.registroPacienteForm.controls['validadeConvenio'].value,
    //       cep: this.registroPacienteForm.controls['cep'].value,
    //       cidade: this.registroPacienteForm.controls['cidade'].value,
    //       estado: this.registroPacienteForm.controls['estado'].value,
    //       logradouro: this.registroPacienteForm.controls['logradouro'].value,
    //       numero: this.registroPacienteForm.controls['numero'].value,
    //       complemento: this.registroPacienteForm.controls['complemento'].value,
    //       bairro: this.registroPacienteForm.controls['bairro'].value,
    //       referencia: this.registroPacienteForm.controls['referencia'].value,
    //     };
    //     this.pacienteService.adicionarPaciente(this.paciente);
    //   } else {
    //     alert('Paciente já cadastrado');
    //   }
    // }
  }
}
