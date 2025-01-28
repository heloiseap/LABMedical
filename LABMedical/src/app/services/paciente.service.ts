import { Injectable } from '@angular/core';
import pacientes from '../../mock-db/pacientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  urlPath: string = 'localhost:8081/pacientes'

  constructor(private httpClient: HttpClient) {}

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

  buscarPacienteId(parametro: string): Observable<any> {
    const paciente = pacientes.find((paciente) => paciente.id === parseInt(parametro));
    return of(paciente)
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

  editarPaciente(id: string, pacienteAntigo: any) {
    console.log(pacienteAntigo)
    //todo
  }
}
