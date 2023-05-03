import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, ConfirmEventType } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { Carnet } from 'src/app/modells/carnetMunicipal';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  visible: boolean;
  servicioCompartido : MenuItem[]
  activeItem : MenuItem
  activeFormIntermunicipal: boolean
  activeFormUrbano: boolean
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

  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder, private message: MessageService, private sanitizer: DomSanitizer) {
    this.formCarnetMunicipal = fb.group({
      nombre : new FormControl('', [Validators.required]),
      apellido : new FormControl('', Validators.required),
      usuario : new FormControl('', [Validators.required]),
      fechaDeNacimiento: new FormControl('', Validators.required)
    })
    this.formCarnetUrbano = fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', Validators.required)
    })
    this.usuario= ''
    this.tipoUsuario = [{tipo: "Adulto mayor"}, {tipo: "Estudiante universitario"}]
    this.visible = false;
    this.servicioCompartido = [{ label: 'Servicio Urbano', icon: 'pi pi-fw pi-home' }, { label: 'Servicio Intermunicipal', icon: 'pi pi-fw pi-home' }]
    this.activeItem = {}
    this.activeFormIntermunicipal = false
    this.activeFormUrbano = false
    this.img1 = ''
    this.img2 = ''
    this.img3 = ''
    this.viewUpdateImage = false
    this.fechaSeleccionada = new Date()
    this.imagenCargada = false
  }

  showDialog() {
    this.visible = true
  }

  servicio(item : MenuItem){
    this.activeItem = item
    console.log();
    if(this.activeItem.label == "Servicio Urbano"){
      this.activeFormUrbano = true
      this.activeFormIntermunicipal = false
    }else if(this.activeItem.label == "Servicio Intermunicipal"){
      this.activeFormIntermunicipal = true
      this.activeFormUrbano = false
    }
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
      console.log(carnet);  
    }else{
      this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Por favor verifique que ha llenado todos los campos y que ha subido las imagenes correctamente' });
    }
  }

  carnetUrbano(){
    if(this.formCarnetUrbano.valid && this.imagenCargada){
      let carnet = new Carnet()
      carnet.nombre = this.formCarnetUrbano.get('nombre')?.value
      carnet.apellido = this.formCarnetUrbano.get('apellido')?.value
      carnet.tipoUsuario = this.formCarnetUrbano.get('tipoDocumento')?.value
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
