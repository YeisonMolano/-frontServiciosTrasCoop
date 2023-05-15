import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, ConfirmEventType } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { Carnet } from 'src/app/modells/carnet';
import { Router } from '@angular/router';
import { CarnetService } from 'src/app/service/carnet.service';
import { TaxiService } from 'src/app/modells/taxiService';
import { TaxiServiceService } from 'src/app/service/taxi-service.service';
import { TypeService } from 'src/app/modells/typeService';
import { PdfService } from 'src/app/service/pdf.service';

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
  formCarnet: FormGroup
  tipoUsuario : Array<TypeService>
  tipoUsuarioUno : Array<TypeService>
  usuario : TypeService
  uploadedFiles: any[] = [];
  img1 : string
  img2 : string
  img3 : string
  viewUpdateImage : boolean
  tipoUno : TypeService
  tipoDos : TypeService
  tipoTres : TypeService
  fechaSeleccionada: Date
  imagenCargada: boolean
  admin: boolean
  activeCarnetsAdmin: boolean
  activeServicesAdmin: boolean
  servicios: Array<TaxiService>
  serviciosTaxi: Array<TaxiService>
  carnetsPendientes: Array<Carnet>
  viewCarnetPending: boolean
  imgCarnetPending: string

  constructor(private router: Router, private confirmationService: ConfirmationService, 
    private fb: FormBuilder, private message: MessageService, private sanitizer: DomSanitizer, 
    private carnetService: CarnetService, private taxiService: TaxiServiceService,
    private pdf: PdfService) {
    this.formCarnetMunicipal = fb.group({
      nombre : new FormControl('', [Validators.required]),
      apellido : new FormControl('', Validators.required),
      usuario : new FormControl('', [Validators.required]),
      fechaDeNacimiento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required])
    })
    this.formCarnetUrbano = fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      usuario : new FormControl('', [Validators.required]),
      fechaDeNacimiento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required])
    })
    this.formCarnet = fb.group({
      nombre: new FormControl('', []),
      apellido: new FormControl('', []),
      tipoUsuario: new FormControl('', []),
      fechaNacimiento: new FormControl('', []),
      tipoCarnet: new FormControl('', []),
      status: new FormControl('', []),
      email: new FormControl('', []),
      img1: new FormControl('', []),
      img2: new FormControl('', []),
      img3: new FormControl('', []),
    })
    this.admin = false
    this.usuario= new TypeService()
    this.tipoUsuario = new Array<TypeService>()
    this.tipoUsuarioUno = new Array<TypeService>()
    this.tipoUno = new TypeService()
    this.tipoUno.name = 'Estudiante Universitario'
    this.tipoDos = new TypeService()
    this.tipoDos.name = 'Estudiante'
    this.tipoTres = new TypeService()
    this.tipoTres.name = 'Adulto Mayor'
    this.tipoUsuario.push(this.tipoUno)
    this.tipoUsuario.push(this.tipoTres)
    this.tipoUsuarioUno.push(this.tipoDos)
    this.tipoUsuarioUno.push(this.tipoTres)
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
    this.carnetsPendientes = new Array<Carnet>()
    this.viewCarnetPending = false
    this.imgCarnetPending = ''
  }
  ngOnInit(): void {
    if(localStorage.getItem('auth') == 'ADMIN'){
      this.admin = true
      this.taxiService.getAllServices().subscribe(res => {
        this.serviciosTaxi = res
      })
      this.carnetService.findAllPending().subscribe(res => {
        this.carnetsPendientes = res
        console.log(this.carnetsPendientes);
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
      carnet.tipoUsuario = this.usuario.name
      carnet.fechaNacimiento = this.formCarnetMunicipal.get('fechaDeNacimiento')?.value
      carnet.email = this.formCarnetMunicipal.get('email')?.value
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
      carnet.tipoUsuario = this.usuario.name
      carnet.fechaNacimiento = this.formCarnetUrbano.get('fechaDeNacimiento')?.value
      carnet.email = this.formCarnetUrbano.get('email')?.value
      carnet.img1 = this.img1
      carnet.status = 'PENDIENTE'
      carnet.tipoCarnet = 'URBANO'
      console.log(carnet);
      
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

  viewCarnetPendingDialog(carnet: any){
    console.log(carnet);
    this.formCarnet.get('nombre')?.setValue(carnet.newCarnet.username)
    this.formCarnet.get('apellido')?.setValue(carnet.newCarnet.apellido)
    this.formCarnet.get('tipoUsuario')?.setValue(carnet.newCarnet.tipoUsuario)
    this.formCarnet.get('fechaNacimiento')?.setValue(carnet.newCarnet.fechaNacimiento)
    this.formCarnet.get('tipoCarnet')?.setValue(carnet.newCarnet.tipoCarnet)
    this.formCarnet.get('status')?.setValue(carnet.newCarnet.status)
    this.formCarnet.get('email')?.setValue(carnet.newCarnet.nombre)
    this.imgCarnetPending = carnet.newCarnet.img1!
    console.log(carnet);
    this.viewCarnetPending = true
  }

  crearCarnet(){
    let descuento = ''
    if(this.formCarnet.get('tipoUsuario').value == 'Estudiante' || this.formCarnet.get('tipoUsuario').value == 'Estudiante Universitario'){
      descuento = 'Descuento por estudio'
    }else{
      descuento = 'Desceunto por edad'
    }
    this.pdf.createPdf(this.formCarnet.get('tipoCarnet').value, this.formCarnet.get('nombre').value + ' ' + this.formCarnet.get('apellido').value, this.formCarnet.get('tipoUsuario').value, this.formCarnet.get('fechaNacimiento').value, descuento)
    this.eliminarDeLaLista(this.formCarnet.get('nombre').value, this.formCarnet.get('apellido').value)
    this.formCarnet.reset()
    this.viewCarnetPending = false
  }

  eliminarDeLaLista(nombre: string, apellido: string){
    let count = 0
    for (let i = 0; i < this.carnetsPendientes.length; i++) {
      if(this.carnetsPendientes[i].nombre == nombre && this.carnetsPendientes[i].apellido == apellido){
        count = i;
      }
    }
    this.carnetsPendientes.splice(count - 1, 1)
  }

  aprovarServicioTaxi(recogida: any, llegada: any, time: any){
    let count = 0
    for (let i = 0; i < this.serviciosTaxi.length; i++) {
      if(this.serviciosTaxi[i].placeDeparture == recogida && this.serviciosTaxi[i].destinationPlace == llegada && this.serviciosTaxi[i].time == time){
        count = i;
      }
    }
    this.serviciosTaxi.splice(count, 1)
  }

  rechazar(){
    let count = 0
    for (let i = 0; i < this.carnetsPendientes.length; i++) {
      if(this.carnetsPendientes[i].nombre == this.formCarnet.get('nombre').value && this.carnetsPendientes[i].apellido == this.formCarnet.get('apellido').value){
        count = i;
      }
    }
    this.viewCarnetPending = false
    this.carnetsPendientes.splice(count - 1, 1)
    this.formCarnet.reset()
  }
}
