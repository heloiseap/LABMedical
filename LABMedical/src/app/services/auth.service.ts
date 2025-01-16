import { Injectable } from '@angular/core';
import usuarios from '../../mock-db/usuarios.json';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  listaUsuarios = usuarios

  constructor(private localStorageService: LocalStorageService) {}

  login(email: string, password: string): boolean {
    const emailStorage = JSON.parse(this.localStorageService.getItem("login") || '');
    const passwordStorage = JSON.parse(this.localStorageService.getItem("password") || '');

  
    if(email === emailStorage && password === passwordStorage && (emailStorage !== "" || passwordStorage !=="")){
      // this.isLogged = true;
      //localStorage.setItem("logado", "true");
      // this.localStorageService.setItem("logado", "true");
      // this.localStorageService.setItem("token","mocktoken")
      return true
    }
    return false;
  }
  // isLocalStorageAvailable(): boolean {
  //   try {
  //     const testKey = '__test_key__';
  //     localStorage.setItem(testKey, testKey);
  //     localStorage.removeItem(testKey);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  nomeUser(): string {
    // let check = this.listaUsuarios.filter(usuario => usuario.email == this.loginForm.controls.emailUser.value)  
    const usuario = JSON.stringify(this.localStorageService.getItem("nomeUser") || '');
    return usuario;
    // if (this.isLocalStorageAvailable()) {
    //   return localStorage.getItem('nomeUser') || '';
    // } else {
    //   return '';
    // }
  }

  estaAutenticado(): boolean {
    // if (!!localStorage) {
    //   return !!localStorage.getItem("token")
    // } else 
    //   return false
    // }
    const token = this.localStorageService.getItem("token")
    if (token && token !==''){
      return true;
    }
    return false;
  }

  logout(): void {
    this.localStorageService.setItem('token', '')
    this.localStorageService.clear()    // this.localStorageService.removeItem('token');//pq n ta funcoinando??
    // this.localStorageService.removeItem('logado')
  }

  getPermition(): boolean{
    return !!this.localStorageService.getItem("permition") && this.localStorageService.getItem("permition")!=='';
  }
  
}
