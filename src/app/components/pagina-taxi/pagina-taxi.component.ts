import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-taxi',
  templateUrl: './pagina-taxi.component.html',
  styleUrls: ['./pagina-taxi.component.css']
})
export class PaginaTaxiComponent {
  tipoServicio = [{}]
  servicio : string

  constructor(){
    this.tipoServicio = [{nombre: "Diario"}, {nombre: "Semanal"}, {nombre: "Mensual"}]
    this.servicio = ''
  }
}
