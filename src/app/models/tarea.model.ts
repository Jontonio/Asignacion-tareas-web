import { File } from './listaFiles.model';
export class Tarea{
    id         :string;
    titulo     :string;
    descripcion:string;
    fechaInicio:string;
    tiempoTarea:string;
    estadoTarea:boolean;
    imagen     :string;
    listaFiles : File[];

    constructor(){
        this.id = this.id
        this.titulo = this.titulo;
        this.fechaInicio = this.fecha();
        this.descripcion = this.descripcion;
        this.estadoTarea = false;
        this.imagen = this.imagen;
        this.listaFiles = [];
        this.tiempoTarea = this.tiempoTarea;
    }

    fecha():string{
        const anioActual = new Date().getUTCFullYear();
        let mesActual = new Date().getMonth();
        let mes = new Date().getMonth();
        const diaActual = new Date().getDate();
        mes = mesActual+1;
        if(mes<10){
            mes = ('0'+mes) as any;
        } 
        return (`${anioActual}-${mes}-${diaActual}`);
    }

}