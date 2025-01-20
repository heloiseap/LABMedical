import { Injectable } from '@angular/core';
import consultas from '../../mock-db/consultas.json';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  constructor() {}

  listaConsultas: Array<object> = consultas;

  quantidadeConsultas() {
    return consultas.length;
  }
  buscarConsultas(id: string) {
    return consultas.map((consulta) => {
      if (consulta.idPaciente == parseInt(id)) {
        return consulta;
      } else {
        return ''
      }
    })
  }

  registroConsulta(consultaNova: object) {
    this.listaConsultas.push(consultaNova);
    localStorage.setItem('consultas', JSON.stringify(this.listaConsultas));
  }
}
