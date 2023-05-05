import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-taxi',
  templateUrl: './pagina-taxi.component.html',
  styleUrls: ['./pagina-taxi.component.css']
})
export class PaginaTaxiComponent implements OnInit{
  tipoServicio = [{}]
  servicio : string
  

  constructor(){
    this.tipoServicio = [{nombre: "Hoy"}, {nombre: "Semanal"}, {nombre: "Mensual"}]
    this.servicio = ''
  }
  ngOnInit(): void {
    
  }
}
