import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionsService {

  // variables
  listaSvg    :string[] = ['p-1.svg','p-2.svg','p-3.svg','p-4.svg'];
  listaSvgHome:string[] = [ 'i-1.svg', 'i-6.svg', 'i-11.svg',
                            'i-2.svg', 'i-7.svg', 'i-12.svg',
                            'i-3.svg', 'i-8.svg', 'i-13.svg',
                            'i-4.svg', 'i-9.svg', 'i-14.svg',
                            'i-5.svg', 'i-10.svg','i-15.svg'];
  imgLogin    : string;
  imgHome     : string;
  ruta        : string = './assets/svg/';

  constructor() {
    // inicializar funciones
    this.inicializarSvg();
  }

  inicializarSvg(){
    const ran = Math.floor(Math.random()*(4-1)+1);
    const ranHome = Math.floor(Math.random()*(14-1)+1);
    this.imgLogin = this.ruta+this.listaSvg[ran];
    this.imgHome  = this.ruta+this.listaSvgHome[ranHome];
  }

  tiempoRestante(startFecha:string,endFecha:string){
    let fechaInicio = new Date(startFecha).getTime();
    let fechaFin    = new Date(endFecha).getTime();
    let diff = fechaFin - fechaInicio;
    diff = (diff/(1000*60*60*24));
    return parseInt(diff.toString(),10);
  }

  validarFecha():string{
    const fechaActual = new Tarea();
    return fechaActual.fecha();
  }




}
