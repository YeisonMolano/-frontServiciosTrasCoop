import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthorizationService } from 'src/app/service/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  titulo = 'Bienvenido a la empresa de transporte "TransCoop"'
  enlaces : MenuItem[]
  principal : MenuItem
  username: string
  logued: boolean
  myWallet: string

  constructor(private auth: AuthorizationService, private router: Router){
    this.enlaces = [{ label: 'Pedir servicio', routerLink: '/servicio-taxi' }, { label: 'Horario y precios', routerLink: '/info' }]
    this.principal = { icon: 'pi pi-home', routerLink: '/' }
    this.username = localStorage.getItem('name')!
    this.logued = false
    this.myWallet = ''
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('name')!
    this.myWallet = localStorage.getItem('myWallet')!
    if(localStorage.getItem('auth') != 'ADMIN' ){
      this.logued = true
    }
  }

  logOut(){
    this.auth.logOut()
    this.router.navigate(['/login'])
  }
}
