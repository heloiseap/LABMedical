import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculoIdade',
  standalone: true
})
export class CalculoIdadePipe implements PipeTransform {
  
  dataAtual = new Date()
  ano = this.dataAtual.getFullYear()
  mes = this.dataAtual.getMonth()
  dia = this.dataAtual.getDate()
  idade: number = 0
  
  transform(data: string): number {
    //formato da string data: 'aaaa/mm/dd'
    data.split('-')
    let anoNasc = parseInt(data.split('-')[0])
    let mesNasc = parseInt(data.split('-')[1])
    let diaNasc = parseInt(data.split('-')[2])
    this.idade = this.ano - anoNasc
    if (mesNasc < this.mes || (mesNasc==this.mes && diaNasc<this.dia)){
      this.idade -= 1
    }
    return this.idade;
  }

}
