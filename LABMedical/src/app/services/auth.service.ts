import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;

  constructor() {}

  login(email: string, password: string) {
    let emailStorage = localStorage.getItem("login");
    let passwordStorage = localStorage.getItem("password");
  
    if(email === emailStorage && password === passwordStorage){
      this.isLogged = true;
    }
  }

  getPermition(){
    return localStorage.getItem("permition") || "";
  }
}
