import { Injectable } from '@angular/core';
import pacientes from '../../mock-db/pacientes.json';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor() {}

  listaPacientes = pacientes;
  quantidadePacientes() {
    return pacientes.length;
  }

  buscarPaciente(nome: string) {
    return pacientes.filter((paciente) => paciente.nome === nome);
  }

  pegarNove() {
    if (this.listaPacientes.length > 9) {
      return this.listaPacientes.slice(0, 9);
    } else {
      return this.listaPacientes;
    }
  }

  adicionarPaciente(pacienteNovo: any) {
    let ultimaId = Math.max.apply(
      null,
      this.listaPacientes.map((paciente) => paciente.id)
    );
    pacienteNovo.id = ultimaId + 1;
    this.listaPacientes.push(pacienteNovo);
    localStorage.setItem('pacientes', JSON.stringify(this.listaPacientes));
    console.log(pacienteNovo);
  }
}
