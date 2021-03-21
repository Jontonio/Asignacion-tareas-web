import { Component, OnInit } from '@angular/core';
import { FuncionsService } from '../../services/funcions.service';
import { FirebaseService } from '../../services/firebase.service';
import { Tarea } from '../../models/tarea.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  mensajeCompleto:string = '';
  titulo         :string = '';
  textoBuscar    :string = '';

  constructor(
    public funService: FuncionsService, 
    public fireService:FirebaseService,
    public authService:AuthService) {
      this.fireService.obtenerTareas();
  }

  ngOnInit(): void {
  }

  verMore(mensaje:string, titulo:string){
    this.mensajeCompleto = mensaje
    this.titulo = titulo;
  }

  terminarTarea(estado:boolean, tarea:Tarea){
    tarea.estadoTarea = estado;
    this.fireService.updateTarea(tarea).subscribe(
      (res)=>{},(err)=>{ console.log(err) }
    )
  }

  editarstado(estado:boolean, tarea:Tarea){
    tarea.estadoTarea = !estado
    this.fireService.updateTarea(tarea).subscribe(
      (res)=>{},(err)=>{ console.log(err) }
    )
  }


}
