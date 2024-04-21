import { Injectable } from '@angular/core';
import pacientes from '../../mock-db/pacientes.json'
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() { }

  ultimaId = localStorage.getItem("ultimaId") 
  listaPacientes: Array<object> = pacientes


  buscarPaciente(nome: string) {
    return pacientes.filter(paciente => paciente.nome === nome)
  }
  adicionarPaciente(pacienteNovo: object){

    this.listaPacientes.push(pacienteNovo)
    localStorage.setItem('pacientes',JSON.stringify(this.listaPacientes))

  }
}
