import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authorities: FormGroup
  constructor(private authService: AuthorizationService, private fb: FormBuilder, private router: Router){
    this.authorities = fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  logIn(){
    if(this.authorities.valid){
      if(this.authService.login(this.authorities.get('username')?.value, this.authorities.get('password')?.value)){
        this.router.navigate([''])
      }else{
        console.log('El usuario no existe');
      }
    }else{
      console.log('Por favor ingrese todos los datos');
    }
  }
}
