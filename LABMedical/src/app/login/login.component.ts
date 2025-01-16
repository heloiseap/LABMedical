import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import usuarios from '../../mock-db/usuarios.json';
import { CommonModule } from '@angular/common';
import { TokenService } from '../services/token.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  listaUsuarios = usuarios

  login = {
    emailUser: '',
    senhaUser: ''
  }

  constructor(private router: Router, private tokenService: TokenService, private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailUser: new FormControl('',[
        Validators.required
      ]),
      senhaUser: new FormControl('', [
        Validators.required
      ])
    })  
  }

  fazerLogin() {
    if (this.loginForm.valid){
      let check = this.listaUsuarios.filter(usuario => usuario.email == this.loginForm.controls.emailUser.value)  
      if (check.length !=0) {
        if (check[0].senha == this.loginForm.controls.senhaUser.value){
          //
          let token = this.tokenService.gerarMockToken(check[0].email)
          //
          this.localStorageService.setItem("nomeUser", check[0].nome)
          this.localStorageService.setItem("token", token)
          //localStorage.setItem("nomeUser", check[0].nome)
          // localStorage.setItem("token", token)
          // localStorage.setItem("logado","true")
          this.router.navigate(['inicio'])

        } else {
          alert("Senha incorreta")
          this.loginForm.patchValue({senhaUser: ''})
        }
      } else {
        alert("Usuário não cadastrado")
      }
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
  criarConta() {
    this.router.navigate(['cadastro'])
  }

  mudarSenha() {
    this.router.navigate(['reset-senha'])
  }
}
