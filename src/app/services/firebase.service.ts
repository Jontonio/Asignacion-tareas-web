import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '../models/listaFiles.model';
import { Tarea } from '../models/tarea.model';
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Archivo } from '../models/archivo.models';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  url           : string = 'https://ourtasks-6eaa7-default-rtdb.firebaseio.com/';
  listaArchivos : File[] = [];
  listaTareas   : Tarea[] = [];
  cargando      : boolean = false;
  cargandoPagina: boolean = false;
  porcentajeUp:number = 0;

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private http: HttpClient ) {
      this.existFileArray();
    }

  guardarData(data:Tarea){
    return this.http.post(`${this.url}Tareas.json`,data);
  }

  obtenerTareas(){
    this.getData().subscribe(
      (res)=>{
        this.cargandoPagina = true;
        this.listaTareas = res
      },
      (err)=>{ console.log(err) })
  }

  getTarea(key:string|any):Observable<Tarea>{
    return this.http.get<Tarea>(`${this.url}Tareas/${key}.json`);
  }

  updateTarea(tareaNueva:Tarea){
    return this.http.put(`${this.url}Tareas/${tareaNueva.id}.json`,tareaNueva);
  }

  getData(){
    return this.http.get(`${this.url}Tareas.json`)
          .pipe(
              map(resp =>{ return this.convertirArreglo(resp) })
          )
  }

  deleteTarea(key:string, indice:number){
    this.http.delete(`${this.url}Tareas/${key}.json`).subscribe(
      (res)=>{
        this.listaTareas.splice(indice,1);
      },(err)=>{ console.log(err) })
  }

  deleteFilesPrint(key:string){
    return this.firestore.doc(`imprimir/${key}`).delete();
  }

  convertirArreglo(objetoTarea:Object){
    let indice = 0
    const listaTareas: Tarea[] = [];
    if(objetoTarea){
      Object.keys(objetoTarea).forEach(key=>{
        let tareaAux: Tarea;
            tareaAux = Object.values(objetoTarea)[indice];
            tareaAux.id = key;
            listaTareas.push(tareaAux);
        indice = indice + 1;
      })
    }
    return listaTareas.reverse();
  }

  uploadFilesPrint(archivos:Archivo){

    return  this.firestore.collection('imprimir').add( archivos.toObject() );

  }

  updateId( id:string ){

    return this.firestore.doc(`imprimir/${id}`).update({ id });

  }

  getPrintArchivos(){

    return this.firestore.collection<Archivo>('imprimir').valueChanges();

  }

  convertirArregloArchivos(objetoArchivo:Object){
    let indice = 0
    const listaArchivos: Archivo[] = [];
    if(objetoArchivo){
      Object.keys(objetoArchivo).forEach(key=>{
        let archivoAux: Archivo;
            archivoAux = Object.values(objetoArchivo)[indice];
            archivoAux.id = key;
            listaArchivos.push(archivoAux);
        indice = indice + 1;
      })
    }
    return listaArchivos.reverse();
  }

  uploadFile(event:any) {

    const name = new Date().getTime();
    const file = event.target.files[0];
    const ruta = 'archivos/'+name;
    const ref = this.storage.ref(ruta);
    const task = ref.put(file);

    // verificamos mientras se sube la foto
    this.cargando = true;
    task.then((tarea)=>{
        ref.getDownloadURL().subscribe((imgUrl)=>{
          // obteniendo la url reseteamos el porcentaje
          this.porcentajeUp = 0;
          this.cargando = false;
          const archivo = new File(imgUrl, file.name, file.size);
          this.listaArchivos.push({...archivo});
          this.saveLocalstorage();
        })
    })

    //observale de la subida del archivo en %
    task.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeUp = this.conInt(porcentaje);
    })

  }

  eliminarItemFile(indice:number){
    this.listaArchivos.splice(indice,1);
    this.saveLocalstorage();
  }

  conInt(value:any):number{
    return parseInt(value,10);
  }

  saveLocalstorage(){
    localStorage.setItem('files_print', JSON.stringify(this.listaArchivos))
  }

  existFileArray(){

    if(localStorage.getItem('files_print')){

      this.listaArchivos = JSON.parse(localStorage.getItem('files_print')!) || [];

    }

  }

}
