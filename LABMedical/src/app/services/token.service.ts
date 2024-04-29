import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test_key__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }


  get logado() {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('logado') || '';
    } else {
      return '';
    }
  }

  get medico() {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('nomeUser') || '';
    } else {
      return '';
    }
  }


  setLogado(value: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('logado', value);
    }
  }

  setMedico(value: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('nomeUser', value);
    }
  }
  
  temPermissao() {
    if (this.logado == 'true') {
      return true;
    } else {
      return false;
    }
  }

  nomeMedico() {
    if (this.medico!=''){
      return localStorage.getItem('nomeUser')
    } else {
      return ''
    }

  }
}
