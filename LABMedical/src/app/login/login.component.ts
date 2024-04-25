import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  login = {
    emailUser: '',
    senhaUser: ''
  }

  constructor(private router: Router){}

  ngOnInit(): void {
    //declarar aqui o form
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
    
  }
  
  criarConta() {
    this.router.navigate(['cadastro'])
  }

  resetarSenha() {
    //todo
  }



}
