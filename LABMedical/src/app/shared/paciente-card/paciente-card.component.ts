import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paciente-card',
  standalone: true,
  imports: [],
  templateUrl: './paciente-card.component.html',
  styleUrl: './paciente-card.component.scss'
})
export class PacienteCardComponent {
  @Input() paciente: {nome: string} | undefined;
}
