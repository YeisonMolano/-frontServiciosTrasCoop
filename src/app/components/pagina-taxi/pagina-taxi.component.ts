import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TaxiService } from 'src/app/modells/taxiService';
import { TypeService } from 'src/app/modells/typeService';
import { TaxiServiceService } from 'src/app/service/taxi-service.service';

@Component({
  selector: 'app-pagina-taxi',
  templateUrl: './pagina-taxi.component.html',
  styleUrls: ['./pagina-taxi.component.css'],
})
export class PaginaTaxiComponent implements OnInit {
  tipoServicio : Array<TypeService>;
  servicio: TypeService;
  formNewService: FormGroup;

  constructor(private fb: FormBuilder, private taxiService: TaxiServiceService, private router: Router, private message: MessageService) {
    this.tipoServicio = new Array<TypeService>()
    let tipoService = new TypeService()
    tipoService.name = 'Hoy'
    this.tipoServicio.push(tipoService)
    let tipoService1 = new TypeService()
    tipoService1.name = 'Quincenal'
    this.tipoServicio.push(tipoService1)
    let tipoService2 = new TypeService()
    tipoService2.name = 'Mensual'
    this.tipoServicio.push(tipoService2)
    this.servicio = new TypeService();
    this.formNewService = fb.group({
      service: new FormControl('', []),
      placeDeparture: new FormControl('', [Validators.required]),
      destinationPlace: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}

  confirmService() {
    if (this.formNewService.valid) {
      let service = new TaxiService();
      service.servicio = this.servicio.name;
      service.placeDeparture = this.formNewService.get('placeDeparture')?.value;
      service.destinationPlace = this.formNewService.get('destinationPlace')?.value;
      service.time = this.formNewService.get('time')?.value;
      this.taxiService.createService(service).subscribe(res => {
        this.formNewService.reset()
        this.router.navigate(['/'])
      },
      err =>{
        this.message.add({severity: 'error', summary: 'Error en el servidor', detail: 'No se ha obtenido la respuesta deseada por el servidor'});
      })
      console.log(service);
    } else {
      this.message.add({severity: 'error', summary: 'Datos invalidos', detail: 'Por favor ingresa todos los datos'});
    }
  }
}
