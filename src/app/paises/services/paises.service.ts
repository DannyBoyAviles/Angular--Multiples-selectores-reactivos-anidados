import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = "https://restcountries.eu/rest/v2"
  private _regiones : string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(){
    return [...this._regiones]; // se envia el arreglo destructurado para evitar modificar accidentalmente el arreglo principal
  }

  constructor(private http:HttpClient) { }

  getPaisesPorRegion( region: string): Observable<PaisSmall[]>{

    const url = `${this.baseUrl}/region/${region}?fieds=alpha3Code;name`
      return this.http.get<PaisSmall[]>(url)
  }

}
