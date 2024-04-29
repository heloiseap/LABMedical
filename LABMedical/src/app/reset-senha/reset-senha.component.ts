import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import usuarios from '../../mock-db/usuarios.json';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-senha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './reset-senha.component.html',
  styleUrl: './reset-senha.component.scss',
})
export class ResetSenhaComponent implements OnInit {
  mudarSenhaForm!: FormGroup;
  listaUsuarios = usuarios;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.mudarSenhaForm = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      senha1: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      senha2: new FormControl('', [Validators.required]),
    });
  }

  senhasIguais() {
    if (
      this.mudarSenhaForm.controls.senha1.value ==
      this.mudarSenhaForm.controls.senha2.value
    ) {
      return true;
    }
    return false;
  }

  mudarSenha() {
    if (this.mudarSenhaForm.valid) {
      let usuario = this.listaUsuarios.filter(
        (usuario) => usuario.email == this.mudarSenhaForm.controls.codigo.value
      );
      if (usuario.length == 1) {
        for (let i = 0; i < this.listaUsuarios.length; i++) {
          if (
            this.listaUsuarios[i].email ==
            this.mudarSenhaForm.controls.codigo.value
          ) {
            this.listaUsuarios[i].senha =
              this.mudarSenhaForm.controls.senha1.value;
              localStorage.setItem("logado","true")
              this.router.navigate(['inicio'])
            break;
          }
        }
      } else {
        alert('Código inválido');
      }
    } else {
      this.mudarSenhaForm.markAllAsTouched();
    }
  }
}
