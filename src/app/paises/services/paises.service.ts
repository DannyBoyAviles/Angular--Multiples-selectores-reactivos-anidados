import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

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

  getPaisesPorCodigo( codigo: string): Observable<Pais | null>{
    if (!codigo) {
      return of(null)
    }
    const url = `${this.baseUrl}/alpha/${codigo}`
    return this.http.get<Pais>(url)
  }

  getPaisesPorCodigoSmall( codigo: string): Observable<PaisSmall>{
    const url = `${this.baseUrl}/alpha/${codigo}?fieds=alpha3Code;name`
    return this.http.get<PaisSmall>(url)
  }

  getPaisesPorCodigos( borders: string[]): Observable<PaisSmall[]>{

    if (!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach( codigo => {
      const peticion = this.getPaisesPorCodigoSmall(codigo);
      peticiones.push(peticion);
    })

    return combineLatest( peticiones );

    // const url = `${this.baseUrl}/alpha/${codigo}?fieds=alpha3Code;name`
    // return this.http.get<PaisSmall>(url)
  }

}
