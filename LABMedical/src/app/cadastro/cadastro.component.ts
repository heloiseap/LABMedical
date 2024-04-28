import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidadorCustomizadoService } from '../services/validador-customizado.service';
import { CommonModule } from '@angular/common';
import usuarios from '../../mock-db/usuarios.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  //email senha repetir senha
  cadastroUserForm!: FormGroup;
  listaUsuarios = usuarios;
  usuario = {
    nome: '',
    email: '',
    senha: '',
  };
  formSubscription: any;

  constructor(
    private validadorCustomizadoService: ValidadorCustomizadoService
  ) {}

  ngOnInit() {
    this.cadastroUserForm = new FormGroup({
      nomeUser: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        this.validadorCustomizadoService.validacaoNomeCompleto(),
      ]),
      emailUser: new FormControl('', [Validators.required, Validators.email]),
      senhaUser: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      senhaRepetir: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        // this.validadorCustomizadoService.checarSenhas(this.cadastroUserForm),
      ]),
    });
    this.formSubscription = this.cadastroUserForm.valueChanges.subscribe(() => {
      this.cadastroUserForm.controls['senhaRepetir'].setValidators(
        this.validadorCustomizadoService.checarSenhas(this.cadastroUserForm)
      );
      this.cadastroUserForm.controls['senhaRepetir'].updateValueAndValidity();
    });
    
  }


  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
  
  cadastrarUser() {
    if (this.cadastroUserForm.valid) {
      this.usuario = {
        nome: this.cadastroUserForm.controls.nomeUser.value,
        email: this.cadastroUserForm.controls.senhaUser.value,
        senha: this.cadastroUserForm.controls.senhaUser.value,
      };
      this.listaUsuarios.push(this.usuario);
      console.log(this.cadastroUserForm);
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
    } else {
      console.log(this.cadastroUserForm.controls.senhaUser);
      console.log(this.cadastroUserForm.controls.senhaRepetir);
      //mostrar erros
    }
  }
}
