import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-exame',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-exame.component.html',
  styleUrl: './registrar-exame.component.scss',
})
export class RegistrarExameComponent implements OnInit {
  registroExameForm!: FormGroup;

  ngOnInit(): void {
    this.registrarExame();
  }

  registrarExame() {
    this.registroExameForm = new FormGroup({
      nomeExame: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      dataExame: new FormControl('',[
        Validators.required
      ]),
      horarioExame: new FormControl('',[
        Validators.required
      ]),
      tipoExame: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      laboratorio: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      urlDocumento: new FormControl('',[]),
      resultado: new FormControl('',[
        Validators.required
      ]),
    });
  }
}
