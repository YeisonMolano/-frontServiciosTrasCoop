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
      this.authService.login(this.authorities.get('username')?.value, this.authorities.get('password')?.value).subscribe(res => {
        if(res != ''){
          localStorage.setItem('name', res.name);
          localStorage.setItem('lastName', res.lastName);
          localStorage.setItem('privateKey', res.privateKey);
          localStorage.setItem('publicKey', res.publicKey);
          localStorage.setItem('email', res.email);
          localStorage.setItem('tellphone', res.tellphone);
          localStorage.setItem('myWallet', res.myWallet);
          this.authService.getWallet(res.privateKey).subscribe(res => {
            localStorage.setItem('myWallet', res);            
            this.router.navigate([''])
          })
        }else{
          console.log('No se ha encontrado el usuario');
          
        }
        
      })
    }else{
      console.log('Por favor ingrese todos los datos');
    }
  }
}
