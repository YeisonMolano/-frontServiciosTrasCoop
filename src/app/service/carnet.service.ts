import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carnet } from '../modells/carnet';

@Injectable({
  providedIn: 'root'
})
export class CarnetService {
  private rutaGlobal = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  createCarnetIntermunicipal(newCarnet: Carnet, wallet: string){
    return this.http.post<any>(this.rutaGlobal + 'carnet-inter/' + wallet, newCarnet, {
      observe: 'response'
    })
  }

  createCarnetUrbano(newCarnet: Carnet, wallet: string){
    return this.http.post<any>(this.rutaGlobal + 'carnet-inter/' + wallet, newCarnet, {
      observe: 'response'
    })
  }

  findAllPending(){
    return this.http.get<any>(this.rutaGlobal + 'get-carnets-pending')
  }
}
