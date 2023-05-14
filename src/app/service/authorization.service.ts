import { Injectable } from '@angular/core';
import { Usuario } from '../modells/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private rutaGlobal = 'http://localhost:8080/'

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.get<any>(this.rutaGlobal + 'login/' + email + '/' + password);
  }

  logOut(){
    localStorage.clear()
  }

  getWallet(privateKey: string){
    return this.http.get<any>(this.rutaGlobal + 'get-wallet/' + privateKey)
  }
}
