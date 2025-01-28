import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidadorCustomizadoService {
  constructor() {}

  validacaoNomeCompleto(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nomes: Array<string> = control.value.split(' ');
      if (nomes.length < 2 || nomes[0].length < 2 || nomes[1].length < 2) {
        return { validacaoNomeCompleto: true };
      }
      return null;
    };
  }

  validacaoCpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;
      const cpfTamanho = cpf.length;
      if (cpfTamanho == 11) {
        const digitosVerificadores = cpf.slice(9);
        let cpfParcial = cpf.slice(0,9)
        cpfParcial += this.digitosValidacao(cpfParcial);
        cpfParcial += this.digitosValidacao(cpfParcial);
        
        if (digitosVerificadores == cpfParcial.slice(9)){
          return { validacaoCpf: true };

        }
        

        // soma =
        //   parseInt(cpf[8]) * 2 +
        //   parseInt(cpf[7]) * 3 +
        //   parseInt(cpf[6]) * 4 +
        //   parseInt(cpf[5]) * 5 +
        //   parseInt(cpf[4]) * 6 +
        //   parseInt(cpf[3]) * 7 +
        //   parseInt(cpf[2]) * 8 +
        //   parseInt(cpf[1]) * 9 +
        //   parseInt(cpf[0]) * 10;
        // resto = soma % 11;
        // digitosVerificadores.push(resto < 2 ? 0 : 11 - resto);
        // soma =
        //   digitosVerificadores[0] * 2 +
        //   parseInt(cpf[8]) * 3 +
        //   parseInt(cpf[7]) * 4 +
        //   parseInt(cpf[6]) * 5 +
        //   parseInt(cpf[5]) * 6 +
        //   parseInt(cpf[4]) * 7 +
        //   parseInt(cpf[3]) * 8 +
        //   parseInt(cpf[2]) * 9 +
        //   parseInt(cpf[1]) * 10 +
        //   parseInt(cpf[0]) * 11;
        // resto = soma % 11;
        // digitosVerificadores.push(resto < 2 ? 0 : 11 - resto);

      }
      return null;
    };
  }

  digitosValidacao(cpfParcial: string) {
    let soma = 0;
    for (let i = cpfParcial.length - 1; i > -1; i--) {
        soma += parseInt(cpfParcial[i]) * (cpfParcial.length+1-i);
    }
    let resto = soma % 11;
    return resto < 2 ? '0' : (11 - resto).toString();
  }

  validacaoCep(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cep = control.value;
      if (cep.length != 8) {
        return { validacaoCep: true };
      }
      return null;
    };
  }

  validacaoRg(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // const rg = control.value.split('/');
      let erros = [];
      const estados: Array<string> = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ];
      if (control.value.includes('/')) {
        let rg = control.value.split('/');
        if (rg[0].length !== 7 && estados.includes(rg[1])) {
          return { validacaoRg: true };
        }
        return null;
      }
      return null;
    };
  }
  // checarSenhas(formGroup: FormGroup): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const senhaUser = control.get('senhaUser')?.value;
  //     const senhaRepetir = formGroup.controls.senhaRepetir?.value;
  //     if (senhaUser !== senhaRepetir) {
  //       return { checarSenhas: true };
  //     }
  //     return null;
  //   };
  // }
}

