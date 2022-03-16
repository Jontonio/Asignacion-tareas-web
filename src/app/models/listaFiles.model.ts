import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class File{

    id:number;
    name:string;
    url:string;
    size:number;
    fechaSubida = new Date();

    constructor(url:string, name:string, size:number){
        this.url = url;
        this.name = name;
        this.fechaSubida = this.fechaSubida;
        this.size = size;
        this.id = new Date().getTime();
    }
}
