import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  url: string = ''
  //url: string = 'https://viacep.com.br/ws/88064730/json/'

  constructor(private http: HttpClient) { }

  pegarEndereco(cepIn: number): Observable<any> {
    this.url = 'https://viacep.com.br/ws/' + cepIn + '/json/'
    return this.http.get(this.url,{headers:{Accept: 'application/json'}})

  }

}
