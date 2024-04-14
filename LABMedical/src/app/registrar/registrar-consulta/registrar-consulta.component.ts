import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-consulta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-consulta.component.html',
  styleUrl: './registrar-consulta.component.scss'
})
export class RegistrarConsultaComponent implements OnInit {
  registroConsultaForm!: FormGroup
  
  ngOnInit(){
    this.registrarConsulta()
  }
  
  registrarConsulta() {
    this.registroConsultaForm = new FormGroup({
      motivo: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      data: new FormControl('',[
        Validators.required
      ]),
      horario: new FormControl('',[
        Validators.required

      ]),
      descricao: new FormControl('',[
        Validators.required

      ]),
      medicacao: new FormControl(''),
      dosagemPrecaucoes: new FormControl('',[
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(256)
      ]),

    })
  }
}
