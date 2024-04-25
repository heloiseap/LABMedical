import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  //email senha repetir senha
  cadastroUserForm!: FormGroup
  usuario = {
    nome:'',
    email:'',
    senha:'',
  }

  ngOnInit() {
    this.cadastroUserForm = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl('')
    })
  }

  cadastrarUser() {
    //check senhas iguais
  }

}
