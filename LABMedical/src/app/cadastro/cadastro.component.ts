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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
    private validadorCustomizadoService: ValidadorCustomizadoService,
    private router: Router
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
  }

  senhasIguais() {
    if (
      this.cadastroUserForm.controls.senhaUser.value ==
      this.cadastroUserForm.controls.senhaRepetir.value
    ) {
      return true;
    }
    return false;
  }

  cadastrarUser() {
    if (this.cadastroUserForm.valid) {
      this.usuario = {
        nome: this.cadastroUserForm.controls.nomeUser.value,
        email: this.cadastroUserForm.controls.senhaUser.value,
        senha: this.cadastroUserForm.controls.senhaUser.value,
      };
      if (
        this.listaUsuarios.filter(
          (user) =>
            user.email == this.usuario.email || user.nome == this.usuario.nome
        ).length != 0
      ) {
        alert('Usuário já cadastrado');
      } else {
        this.listaUsuarios.push(this.usuario);
        localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
        localStorage.setItem('logado', 'true');
        this.router.navigate(['inicio']);
      }
    } else {
      this.cadastroUserForm.markAllAsTouched();
    }
  }
}
