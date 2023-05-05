import { Injectable } from '@angular/core';
import { Usuario } from '../modells/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  users: Array<Usuario>;

  constructor() {
    this.users = new Array<Usuario>();
    let user = new Usuario();
    (user.name = 'Yeison'),
      (user.lastName = 'Molano'),
      (user.password = '1234'),
      (user.userType = 'ADMIN')
    this.users.push(user);
    let user1 = new Usuario();
    (user1.name = 'Maria'),
      (user1.lastName = 'Perez'),
      (user1.password = '0987'),
      (user1.userType = 'USER');
    this.users.push(user1);
  }

  login(username: string, password: string): boolean {
    if(this.findUser(username, password) != undefined){
      let auth = this.findUser(username, password)!.userType
      localStorage.setItem('username', username)
      localStorage.setItem('auth', auth!)
      return true
    }else{
      return false
    }
  }

  findUser(name: string, password: string): Usuario|undefined {
    let usuarioEncontrado = this.users.find((user) => user.name === name && user.password === password);
    this.users.forEach(user =>{
      console.log(user);
    })
    return usuarioEncontrado
  }
}
