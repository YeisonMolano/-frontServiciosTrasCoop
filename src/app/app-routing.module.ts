import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { PaginaTaxiComponent } from './components/pagina-taxi/pagina-taxi.component';
import { InfoPreciosComponent } from './components/info-precios/info-precios.component';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'servicio-taxi', component: PaginaTaxiComponent},
  {path: 'info', component: InfoPreciosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: CrearUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
