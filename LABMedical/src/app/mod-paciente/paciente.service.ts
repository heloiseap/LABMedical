import { Injectable } from '@angular/core';
import pacientes from '../../mock-db/pacientes.json';
import { max } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor() {}

  listaPacientes= pacientes;

  buscarPaciente(nome: string) {
    return pacientes.filter((paciente) => paciente.nome === nome);
  }
  adicionarPaciente(pacienteNovo: any) {
    let ultimaId = Math.max.apply(null,this.listaPacientes.map(paciente => paciente.id))
    pacienteNovo.id = ultimaId + 1
    this.listaPacientes.push(pacienteNovo);
    localStorage.setItem('pacientes', JSON.stringify(this.listaPacientes));
    console.log(pacienteNovo)
  }
}
