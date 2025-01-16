import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setUser(user: string) {
    this.localStorageService.setItem('nomeUser', '');
  }
  constructor(private localStorageService: LocalStorageService) {}

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
      return this.localStorageService.getItem('logado');
    } else {
      return '';
    }
  }

  get medico(): string {
    if (this.isLocalStorageAvailable()) {
      return JSON.stringify(this.localStorageService.getItem('nomeUser'));
    } else {
      return '';
    }
  }

  setLogado(value: string) {
    if (this.isLocalStorageAvailable()) {
      this.localStorageService.setItem('logado', value);
    }
  }

  setMedico(value: string) {
    if (this.isLocalStorageAvailable()) {
      this.localStorageService.setItem('nomeUser', value);
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
    if (this.medico != '') {
      return JSON.stringify(this.localStorageService.getItem('nomeUser'));
    } else {
      return '';
    }
  }

  //gerar token sem backend
  gerarMockToken(email: string): string {
    return `mock-token-${email}-${new Date().getTime()}`;
  }
}
