import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeService } from '../modells/typeService';
import { TaxiService } from '../modells/taxiService';

@Injectable({
  providedIn: 'root'
})
export class TaxiServiceService {
  private rutaGlobal = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  createService(service: TaxiService){
    return this.http.post<TaxiService>(this.rutaGlobal + '/service', service, {
      observe: 'response'
    })
  }

  updateService(service: TaxiService){
    return this.http.put<TaxiService>(this.rutaGlobal + '/service', service, {
      observe: 'response'
    })
  }

  findService(id: number){
    return this.http.get<TaxiService>(this.rutaGlobal + 'find/' + id)
  }
}
