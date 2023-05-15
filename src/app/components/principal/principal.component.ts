import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, ConfirmEventType } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { Carnet } from 'src/app/modells/carnet';
import { Router } from '@angular/router';
import { CarnetService } from 'src/app/service/carnet.service';
import { TaxiService } from 'src/app/modells/taxiService';
import { TaxiServiceService } from 'src/app/service/taxi-service.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  visible: boolean;
  servicioCompartido : MenuItem[]
  activeItem : MenuItem
  activeFormIntermunicipal: boolean
  activeFormUrbano: boolean
  viewPending: boolean
  formCarnetMunicipal: FormGroup
  formCarnetUrbano: FormGroup
  tipoUsuario = [{}]
  usuario : string
  uploadedFiles: any[] = [];
  img1 : string
  img2 : string
  img3 : string
  viewUpdateImage : boolean
  fechaSeleccionada: Date
  imagenCargada: boolean
  admin: boolean
  activeCarnetsAdmin: boolean
  activeServicesAdmin: boolean
  servicios: Array<TaxiService>
  serviciosTaxi: Array<TaxiService>

  constructor(private router: Router, private confirmationService: ConfirmationService, 
    private fb: FormBuilder, private message: MessageService, private sanitizer: DomSanitizer, 
    private carnetService: CarnetService, private taxiService: TaxiServiceService) {
    this.formCarnetMunicipal = fb.group({
      nombre : new FormControl('', [Validators.required]),
      apellido : new FormControl('', Validators.required),
      usuario : new FormControl('', [Validators.required]),
      fechaDeNacimiento: new FormControl('', Validators.required)
    })
    this.formCarnetUrbano = fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fechaDeNacimiento: new FormControl('', Validators.required)
    })
    this.admin = false
    this.usuario= ''
    this.tipoUsuario = [{tipo: "Adulto mayor"}, {tipo: "Estudiante universitario"}]
    this.visible = false;
    this.servicioCompartido = [{ label: 'Servicio Urbano', icon: 'pi pi-fw pi-home' }, { label: 'Servicio Intermunicipal', icon: 'pi pi-fw pi-home' }]
    this.activeItem = {}
    this.activeFormIntermunicipal = false
    this.activeFormUrbano = false
    this.viewPending = false
    this.activeCarnetsAdmin = false
    this.activeServicesAdmin = true
    this.img1 = ''
    this.img2 = ''
    this.img3 = ''
    this.viewUpdateImage = false
    this.fechaSeleccionada = new Date()
    this.imagenCargada = false
    this.servicios = new Array<TaxiService>()
    this.serviciosTaxi = new Array<TaxiService>()
  }
  ngOnInit(): void {
    if(localStorage.getItem('auth') == 'ADMIN'){
      this.admin = true
      this.taxiService.getAllServices().subscribe(res => {
        this.serviciosTaxi = res
        console.log(this.serviciosTaxi);
      })
    }
    this.taxiService.getAllByPublicKey(localStorage.getItem('privateKey')!).subscribe(res => {
      this.servicios = res
    })
  }

  showDialog() {
    if(localStorage.getItem('name') != null){
      this.visible = true
    }else{
      this.router.navigate(['login'])
    }
  }

  servicio(item : MenuItem){
    this.activeItem = item
    if(this.activeItem.label == "Servicio Urbano"){
      this.activeFormUrbano = true
      this.activeFormIntermunicipal = false
    }else if(this.activeItem.label == "Servicio Intermunicipal"){
      this.activeFormIntermunicipal = true
      this.activeFormUrbano = false
    }
  }

  activeCarnets(){
    console.log('Aca');
    
    this.activeCarnetsAdmin = true
    this.activeServicesAdmin = false
  }

  activeServices(){
    console.log('Llego');
    
    this.activeCarnetsAdmin = false
    this.activeServicesAdmin = true
  }

  activePending(){
    this.viewPending = !this.viewPending
  }

  onUpload(event: any) {
    this.message.add({severity: 'info', summary: 'Imagenes enviadas', detail: 'Se han enviado las imagenes, en breve recibira un correo de confirmacion de identidad y su respectivo carnet.'});
    if(event.originalEvent.body.url[0] != ''){
      this.img1 = 'http://localhost:8080/' + event.originalEvent.body.url[0].filename
      this.viewUpdateImage = true
    }
    if(event.originalEvent.body.url[1] != null){
      this.img2 = 'http://localhost:8080/' + event.originalEvent.body.url[1].filename
    }
    if(event.originalEvent.body.url[2] != null){
      this.img3 = 'http://localhost:8080/' + event.originalEvent.body.url[2].filename
    }
    this.imagenCargada = true
  }

  carnetIntermunicipal(){
    if(this.formCarnetMunicipal.valid && this.imagenCargada){
      let carnet = new Carnet()
      carnet.nombre = this.formCarnetMunicipal.get('nombre')?.value
      carnet.apellido = this.formCarnetMunicipal.get('apellido')?.value
      carnet.tipoUsuario = this.formCarnetMunicipal.get('usuario')?.value
      carnet.fechaNacimiento = this.formCarnetMunicipal.get('fechaDeNacimiento')?.value
      carnet.status = 'PENDIENTE'
      carnet.tipoCarnet = 'INTERMUNICIPAL'
      carnet.img1 = this.img1
      carnet.img2 = this.img2
      carnet.img3 = this.img3
      this.carnetService.createCarnetIntermunicipal(carnet, localStorage.getItem('privateKey')!).subscribe(res =>{
        this.formCarnetMunicipal.reset()
      this.img1 = ''
      this.img2 = ''
      this.img3 = ''
      this.imagenCargada = false
      this.viewUpdateImage = false
      this.visible = !this.visible
      this.message.add({ severity: 'success', summary: 'Datos enviados', detail: 'Los datos se han cargado correctamente, se le enviará una confirmación a su correo electronico' });
      },
      err => {
        this.message.add({ severity: 'error', summary: 'Error interno', detail: 'Error en el servidor' });
      })
      
      
    }else{
      this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Por favor verifique que ha llenado todos los campos y que ha subido las imagenes correctamente' });
    }
  }

  carnetUrbano(){
    if(this.formCarnetUrbano.valid && this.imagenCargada){
      let carnet = new Carnet()
      carnet.nombre = this.formCarnetUrbano.get('nombre')?.value
      carnet.apellido = this.formCarnetUrbano.get('apellido')?.value
      carnet.tipoUsuario = this.formCarnetUrbano.get('fechaDeNacimiento')?.value
      carnet.img1 = this.img1
      carnet.status = 'PENDIENTE'
      carnet.tipoCarnet = 'URBANO'
      this.carnetService.createCarnetUrbano(carnet, localStorage.getItem('privateKey')!).subscribe(res => {
        this.formCarnetUrbano.reset()
        this.img1 = ''
        this.imagenCargada = false
      this.viewUpdateImage = false
      this.visible = !this.visible
      this.message.add({ severity: 'success', summary: 'Datos enviados', detail: 'Los datos se han cargado correctamente, se le enviará una confirmación a su correo electronico' });
    },
    err => {
      this.message.add({ severity: 'error', summary: 'Error interno', detail: 'Error en el servidor' });
    })
    }else{
      this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Por favor verifique que ha llenado todos los campos y que ha subido las imagenes correctamente' });
    }
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.message.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type: any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.message.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.message.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}
}
