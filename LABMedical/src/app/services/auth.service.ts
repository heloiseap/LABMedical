import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(email: string, password: string) {
    let emailStorage = localStorage.getItem("login");
    let passwordStorage = localStorage.getItem("password");
  
    if(email === emailStorage && password === passwordStorage){
      console.log(email, emailStorage, password, passwordStorage)
      // this.isLogged = true;
      localStorage.setItem("logado", "true");
    }
  }
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

  nomeUser() {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('nomeUser') || '';
    } else {
      return '';
    }
  }

  estaAutenticado(): boolean {
    if (!!localStorage) {
      return !!localStorage.getItem("token")
    } else {
      return false
    }
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('logado')
  }

  getPermition(){
    return localStorage.getItem("permition") || "";
  }
  
}
