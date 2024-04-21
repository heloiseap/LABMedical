import { Injectable } from '@angular/core';
import consultas from '../../mock-db/consultas.json';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  constructor() {}

  listaConsultas: Array<object> = consultas;

  registrarConsulta(consultaNova: object) {
    this.listaConsultas.push(consultaNova);
    localStorage.setItem('consultas', JSON.stringify(this.listaConsultas));
    console.log(this.listaConsultas)
  }
}
