import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import { ValidadorCustomizadoService } from '../../services/validador-customizado.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../interfaces/paciente';

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

  id: string = '';
  generos = new Map<string, string>([
    ["mulherCis", "Mulher cis"],
    ["mulherTrans", "Mulher trans"],
    ["homemCis", "Homem cis"],
    ["homemTrans", "Homem trans"],
    ["naoBinario", "Não binário"],
    ["naoInforma", "Não informado"],
  ]);
  generosReversed = new Map<string, string>(
    Array.from(this.generos).map(([key, value]) => [value, key])
  );
  estadoCivilMapa = new Map<string, string>([
    ["solteira", "Solteiro(a)"],
    ["casada", "Casado(a)"],
    ["viuva", "Viúvo(a)"],
    ["separada", "Separado(a)"],
    ["divorciada", "Divorciado(a)"]
  ])
  estadoCivilMapaReverso = new Map<string, string>(
    Array.from(this.estadoCivilMapa).map(([key, value]) => [value, key])
  );

  constructor(
    private route: ActivatedRoute,
    private enderecoService: EnderecoService,
    private pacienteService: PacienteService,
    private validadorCustomizadoService: ValidadorCustomizadoService,
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
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
          this.validadorCustomizadoService.validacaoCpf(),
          // Validators.pattern(
          //   '([0-9]{2}[\\.\\-]?[0-9]{3}[\\.\\-]?[0-9]{3}[\\/\\-]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.\\-]?[0-9]{3}[\\.\\-]?[0-9]{3}[-]?[0-9]{2})'
          // ),
        ]),
        rg: new FormControl('', [
          Validators.required,
          this.validadorCustomizadoService.validacaoRg(),
        ]),
        estadoCivil: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [
          Validators.required,
          // Validators.pattern(
          //   '^\\(?[1-9]{2}\\)? ?(?:[2-8]|9 [0-9])[0-9]{3}-?[0-9]{4}$'
          // ),
        ]),
        email: new FormControl('', [Validators.email]),
        naturalidade: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ]),
        contatoEmergencia: new FormControl('', [
          Validators.required,          
          // Validators.pattern(
          //   '^\\(?[1-9]{2}\\)? ?(?:[2-8]|9 [0-9])[0-9]{3}-?[0-9]{4}$'
          // ),
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
          this.validadorCustomizadoService.validacaoCep(), //fix
        ]),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        logradouro: new FormControl(''),
        numero: new FormControl('', [Validators.required]),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        referencia: new FormControl(''),
      });

      if (params['id']) {
        this.id = params['id'];
        this.carregarPaciente(this.id);
      }
    });
  }

  pesquisarCep(): void {
    if (
      !this.registroPacienteForm.controls.cep.errors &&
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
            bairro: data.bairro,
            referencia: '',
          };
          this.registroPacienteForm.patchValue({
            cidade: this.endereco.cidade,
            estado: this.endereco.estado,
            logradouro: this.endereco.logradouro,
            bairro: this.endereco.bairro
          });
        });
    } else {
      alert('Digite um CEP valido');
    }
  }

  carregarPaciente(id: string) {
    this.pacienteService.buscarPacienteId(id).subscribe((pacienteEdicao) => {
      console.log(pacienteEdicao)
      this.registroPacienteForm.patchValue({ 
        nome: pacienteEdicao.nome,
        genero: this.generosReversed.get(pacienteEdicao.genero),
        dataNascimento: pacienteEdicao.dataNascimento,
        cpf: pacienteEdicao.cpf,
        rg: pacienteEdicao.rg,
        estadoCivil: this.estadoCivilMapaReverso.get(pacienteEdicao.estadoCivil),        
        telefone: pacienteEdicao.telefone,
        email: pacienteEdicao.email,
        naturalidade: pacienteEdicao.naturalidade,
        contatoEmergencia: pacienteEdicao.contatoEmergencia,
        emergenciaNome: pacienteEdicao.nomeEmergencia,
        cuidados: pacienteEdicao.cuidadosEspecificos,
        alergias: pacienteEdicao.alergias,
        convenio: pacienteEdicao.convenio,
        nConvenio: pacienteEdicao.nConvenio,
        validadeConvenio: pacienteEdicao.valConvenio,
        cep: pacienteEdicao.cep,
        cidade: pacienteEdicao.cidade,
        estado: pacienteEdicao.estado,
        logradouro: pacienteEdicao.logradouro,
        numero: pacienteEdicao.numero,
        complemento: pacienteEdicao.complemento,
        bairro: pacienteEdicao.bairro,
        referencia: pacienteEdicao.referencia
       });
    });
  }

  salvarPaciente() {
    if (this.registroPacienteForm.valid) { //pq n entraaaaa
      console.log("ok")
      // confirm('Confirmar os dados inseridos?')
      let nomeInserido = this.registroPacienteForm.controls['nome'].value;
      if (this.pacienteService.buscarPaciente(nomeInserido).length === 0) {
        this.pacienteService.adicionarPaciente(this.definirPaciente());
      } else {
        alert('Paciente já cadastrado');
      }
    } else {
      this.definirPaciente()
      this.registroPacienteForm.markAllAsTouched();
    }
  }

  atualizarPaciente() {
    //salva na id da url
    if (this.registroPacienteForm.valid) {
      // confirm('Confirmar os dados inseridos?')
      this.pacienteService.editarPaciente(this.id,this.definirPaciente());
    }
    }

  definirPaciente(): Paciente{
    let generoInserido = this.registroPacienteForm.controls['genero'].value;
    let estadoCivilInserido = this.registroPacienteForm.controls['estadoCivil'].value;
    let paciente = {
      nome: this.registroPacienteForm.controls['nome'].value,
      genero: this.generos.get(generoInserido) ||"", //todo FIX
      dataNascimento:
        this.registroPacienteForm.controls['dataNascimento'].value,
      CPF: this.registroPacienteForm.controls['cpf'].value,
      rg: this.registroPacienteForm.controls['rg'].value,
      estadoCivil: this.estadoCivilMapa.get(estadoCivilInserido) || "", //todo FIX
      telefone: this.registroPacienteForm.controls['telefone'].value,
      email: this.registroPacienteForm.controls['email'].value,
      naturalidade:
        this.registroPacienteForm.controls['naturalidade'].value,
      contatoEmergencia:
        this.registroPacienteForm.controls['contatoEmergencia'].value,
      nomeEmergencia:
        this.registroPacienteForm.controls['emergenciaNome'].value,
      alergias:
        this.registroPacienteForm.controls['alergias'].value.split(','),
      cuidadosEspecificos:
        this.registroPacienteForm.controls['cuidados'].value.split(','),
      convenio: this.registroPacienteForm.controls['convenio'].value,
      numConvenio: this.registroPacienteForm.controls['nConvenio'].value,
      valConvenio:
        this.registroPacienteForm.controls['validadeConvenio'].value,
      cep: this.registroPacienteForm.controls['cep'].value,
      cidade: this.registroPacienteForm.controls['cidade'].value,
      estado: this.registroPacienteForm.controls['estado'].value,
      logradouro: this.registroPacienteForm.controls['logradouro'].value,
      numero: this.registroPacienteForm.controls['numero'].value,
      complemento: this.registroPacienteForm.controls['complemento'].value,
      bairro: this.registroPacienteForm.controls['bairro'].value,
      pontoReferencia:
        this.registroPacienteForm.controls['referencia'].value,
    };
    console.log(paciente)
    return paciente;
  }

}
