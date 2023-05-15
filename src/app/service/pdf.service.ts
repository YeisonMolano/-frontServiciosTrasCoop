import { Injectable } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { TaxiService } from '../modells/taxiService';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  
  constructor() {
    
   }

  createPdf(tipoCarnet: string, nombreCompleto: string, tiopUsuario: string, fechaNacimiento: string, promoUno: string){
    const doc = new jsPDF({orientation: "landscape", unit: "px", format: [300, 150]});
    doc.addImage('http://localhost:8080/logo-home.png', '.png', 100, 60, 250, 100, )
    doc.addImage('http://localhost:8080/user.png', '.png', 240, 20, 35, 35, )
    doc.text(tipoCarnet, 120, 15, null, 'center');
    doc.text('Nombres y Apellidos', 10, 35)
    doc.text(nombreCompleto, 10, 49)
    doc.text('Tipo de usuario', 10, 75)
    doc.text(tiopUsuario, 10, 89)
    doc.text('Fecha de nacimiento', 10, 115)
    doc.text(fechaNacimiento, 10, 129)
    doc.text('*Promociones a las que aplica', 130, 97)
    doc.text(promoUno, 175, 111)
    doc.save("a4.pdf")
  }

  generateRecibo(servicio: TaxiService){
    if(servicio.servicio == 'Quincenal'){
      let fecha = new Date()
      let totalServicioUnitario = (servicio.metros / 90) + 2500
      let totalQuincena = 15 * totalServicioUnitario
      let totalAPagar = totalQuincena * 0.1
      const doc = new jsPDF({orientation: "portrait", unit: "px", format: [300, 500]});
    doc.addImage('http://localhost:8080/logo-home.png', '.png', 100, 60, 250, 100, )
    doc.addImage('http://localhost:8080/user.png', '.png', 240, 20, 35, 35, )
    doc.text("Recibo de pago por quincena", 140, 15, null, 'center');
    doc.text('Servicio ofrecido a:', 10, 40)
    doc.text(localStorage.getItem('name') + ' ' + localStorage.getItem('lastName'), 10, 54)
    doc.text('Lugar de partida', 10, 80)
    doc.text(servicio.placeDeparture, 10, 94)
    doc.text('Lugar de llegada', 10, 120)
    doc.text(servicio.destinationPlace, 10, 134)
    doc.text('Hora de recogida', 10, 160)
    doc.text(servicio.time + '', 10, 174)
    doc.text('Metros por cada recorrido', 10, 200)
    doc.text(servicio.metros + '', 10, 214)
    doc.text('---------------------------------------------------------------------------------------------', 0, 220)
    doc.text('Total a pagar por servicio unitario', 10, 235)
    doc.text(totalServicioUnitario + '', 10, 249)
    doc.text('Total a pagar por quincena', 10, 275)
    doc.text(totalQuincena + '', 10, 289)
    doc.text('Total a pagar por quincena con descuento del 10%', 10, 315)
    doc.text(totalAPagar + '', 10, 329)
    doc.text('Este recibo solamente es valido 24 horas a partir de \nla fecha de creación del mismo', 10, 460)
    doc.text('Fecha de solicitud' + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear(), 10, 488)
    doc.save("reciboQuincena.pdf")
    }else{
      let fecha = new Date()
      let totalServicioUnitario = (servicio.metros / 90) + 2500
      let totalQuincena = 30 * totalServicioUnitario
      let totalAPagar = totalQuincena * 0.3
      const doc = new jsPDF({orientation: "portrait", unit: "px", format: [300, 500]});
    doc.addImage('http://localhost:8080/logo-home.png', '.png', 100, 60, 250, 100, )
    doc.addImage('http://localhost:8080/user.png', '.png', 240, 20, 35, 35, )
    doc.text("Recibo de pago mes", 140, 15, null, 'center');
    doc.text('Servicio ofrecido a:', 10, 40)
    doc.text(localStorage.getItem('name') + ' ' + localStorage.getItem('lastName'), 10, 54)
    doc.text('Lugar de partida', 10, 80)
    doc.text(servicio.placeDeparture, 10, 94)
    doc.text('Lugar de llegada', 10, 120)
    doc.text(servicio.destinationPlace, 10, 134)
    doc.text('Hora de recogida', 10, 160)
    doc.text(servicio.time + '', 10, 174)
    doc.text('Metros por cada recorrido', 10, 200)
    doc.text(servicio.metros + '', 10, 214)
    doc.text('---------------------------------------------------------------------------------------------', 0, 220)
    doc.text('Total a pagar por servicio unitario', 10, 235)
    doc.text(totalServicioUnitario + '', 10, 249)
    doc.text('Total a pagar por mes', 10, 275)
    doc.text(totalQuincena + '', 10, 289)
    doc.text('Total a pagar por quincena con descuento del 10%', 10, 315)
    doc.text(totalAPagar + '', 10, 329)
    doc.text('Este recibo solamente es valido 24 horas a partir de \nla fecha de creación del mismo', 10, 460)
    doc.text('Fecha de solicitud' + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear(), 10, 488)
    doc.save("reciboMes.pdf")
    }
  }
}
