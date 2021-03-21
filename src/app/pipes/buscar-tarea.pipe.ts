import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarTarea'
})
export class BuscarTareaPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    return lista.filter(tarea => tarea.titulo.includes(texto.toLocaleLowerCase()))
  }

}
