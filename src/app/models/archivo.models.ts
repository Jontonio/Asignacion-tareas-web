import { File } from "./listaFiles.model";

export class Archivo{

    id:string;
    dateUpload:number;
    listaArchivo:File[];

    constructor(){
        this.id = '';
        this.dateUpload = new Date().getTime();
        this.listaArchivo = [];
    }

    toObject(){

      return{
        id: this.id,
        dateUpload: this.dateUpload,
        listaArchivo: this.listaArchivo
      }

    }

}

