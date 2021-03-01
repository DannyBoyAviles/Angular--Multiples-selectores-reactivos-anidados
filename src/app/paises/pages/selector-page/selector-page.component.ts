import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from "rxjs/operators";

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required]
  })

  // llenar selectores
  regiones: string[] = [];
  paises : PaisSmall[] = [];

  constructor(private fb: FormBuilder,
              private paisService: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.paisService.regiones;

    //cuando cambie la region (normal)
    // this.miFormulario.get('region')?.valueChanges //escucha los cambios del campo 
    // .subscribe( region =>{
    //   console.log(region);

    //   this.paisService.getPaisesPorRegion( region )
    //   .subscribe(paises =>{
    //     console.log(paises);
        
    //       this.paises = paises          
    //   })
      
    // })

    //cuando cambie la region (con metodo pipe, switcs map y tap)
    this.miFormulario.get('region')?.valueChanges
    .pipe( // ayuda a manipular el valor obtenido y agragra efectos secundarios y otros metodos de RXJS ( ¡¡¡ INVESTIGAR A FONSO !!!)
      tap( ( _ ) => { //TAP: afecto secundario disparado dentro del pipe. // ( _ ) indica que no importa loe que se regrese
        this.miFormulario.get('pais')?.reset('');
      }),
      switchMap(region => this.paisService.getPaisesPorRegion( region )) //obtener el valor producot del observable
    )
    .subscribe( paises => {
      console.log(paises)
      this.paises = paises
    })

  }

  guardar(){
    console.log(this.miFormulario);
    
  }
}

/*SWITHCMAP
EN ESRTE CASO hace el cambio (swicth) del valor del selector por el observable  del servicio solicitado
*/