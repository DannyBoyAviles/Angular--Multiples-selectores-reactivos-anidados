import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones : string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(){
    return [...this._regiones]; // se envia el arreglo destructurado para evitar modificar accidentalmente el arreglo principal
  }

  constructor() { }
}
