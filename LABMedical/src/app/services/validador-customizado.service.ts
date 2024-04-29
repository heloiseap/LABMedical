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

  // validacaoCpf(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const cpf = control.value
  //     if(cpf.toString().length!=10) {
  //       return { validacaoCpf: true }
  //     }
  //     return null;
  //   };
  // }

  validacaoCep(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cep = control.value;
      if (cep.toString().length != 8) {
        return { validacaoCep: true };
      }
      return null;
    };
  }
  validacaoRg(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rg = control.value.split('/');
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
      if (
        (rg.length =
          !2 || rg[0].length != 7 || !estados.includes(rg[1].toUpperCase()))
      ) {
        return { validacaoRg: true };
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
