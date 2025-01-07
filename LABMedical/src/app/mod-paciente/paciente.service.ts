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

  buscarPaciente(parametro: string) {
    let porNome = pacientes.filter((paciente) => paciente.nome.includes(parametro));
    let porEmail = pacientes.filter((paciente) => paciente.email.includes(parametro) && paciente.email!='');
    let porTelefone = pacientes.filter(
      (paciente) => paciente.telefone.includes(parametro)
    );
    

    let resultado: any = [porNome, porEmail, porTelefone];

    return resultado.filter((array: string | any[]) => array.length > 0)[0];
  }

  buscarPacienteId(parametro: string) {
    return pacientes.filter((paciente) => paciente.id === parseInt(parametro))[0];
  }

  pegarDez() {
    if (this.listaPacientes.length > 10) {
      return this.listaPacientes.slice(0, 10);
    } else {
      return this.listaPacientes;
    }
  }

  pegarTodos() {
    return this.listaPacientes;
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
