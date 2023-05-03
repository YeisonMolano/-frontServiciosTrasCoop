import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titulo = 'Bienvenido a la empresa de transporte "TransCoop"'
  enlaces : MenuItem[]
  principal : MenuItem

  constructor(){
    this.enlaces = [{ label: 'Transporte individual', routerLink: '/servicio-taxi' }, { label: 'Transporte compartido' }, { label: 'Servicio intermunicipal' }]
    this.principal = { icon: 'pi pi-home', routerLink: '/' }
  }
}
