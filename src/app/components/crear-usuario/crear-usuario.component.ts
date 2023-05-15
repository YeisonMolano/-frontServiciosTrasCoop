import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modells/usuario';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  formNewUser: FormGroup
  isAdmin: boolean

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthorizationService, private router: Router){
    this.isAdmin = false
    this.formNewUser = fb.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tellphone: new FormControl('', [Validators.required]),
      auth: new FormControl('', [Validators.required])
    })
  }

  createUser(){    
    if(this.formNewUser.valid){
      let newUser = new Usuario()
      newUser.name = this.formNewUser.get('name')?.value
      newUser.lastName = this.formNewUser.get('lastName')?.value
      newUser.password = this.formNewUser.get('password')?.value
      if(this.formNewUser.get('auth')?.value){
        newUser.auth = 'ADMIN'
      }else{
        newUser.auth = 'USER'
      }
      newUser.email = this.formNewUser.get('email')?.value
      newUser.tellphone = this.formNewUser.get('tellphone')?.value
      newUser.username = this.formNewUser.get('name')?.value
      this.userService.createUser(newUser).subscribe(res => {
        console.log(res);
          localStorage.setItem('name', res.body.name);
          localStorage.setItem('lastName', res.body.lastName);
          localStorage.setItem('privateKey', res.body.privateKey);
          localStorage.setItem('publicKey', res.body.publicKey);
          localStorage.setItem('email', res.body.email);
          localStorage.setItem('tellphone', res.body.tellphone);
          localStorage.setItem('myWallet', res.body.myWallet);
          localStorage.setItem('auth', res.body.auth)
          this.authService.getWallet(res.body.privateKey).subscribe(res => {
            localStorage.setItem('myWallet', res);            
            this.router.navigate([''])
          })
      })
    }else{
      console.log('error');
      
    }
  }
}
