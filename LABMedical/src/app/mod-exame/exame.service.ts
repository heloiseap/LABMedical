import { Injectable } from '@angular/core';
import exames from '../../mock-db/exames.json'

@Injectable({
  providedIn: 'root'
})
export class ExameService {

  constructor() { }

  listaExames: Array<object> = exames

  adicionarExame(exameNovo: object) {
    this.listaExames.push(exameNovo)
    localStorage.setItem('exames',JSON.stringify(this.listaExames))

  }
}
