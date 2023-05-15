import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modells/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rutaGlobal = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  createUser(user: Usuario){
    return this.http.post<any>(this.rutaGlobal + 'registrar-usuario', user, {
      observe: 'response'
    })
  }
}
