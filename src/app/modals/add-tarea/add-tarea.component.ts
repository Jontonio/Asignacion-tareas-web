import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { FuncionsService } from '../../services/funcions.service';
import { Tarea } from '../../models/tarea.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent implements OnInit {
  
  id              :string;
  tituloFormulario:string = 'Agregar nueva tareas';
  mensajeButton  :string = 'Guardar tarea';
  cargandoGuardar:boolean = false;
  vistaMensaje   :boolean = false;
  formularioAdd  :FormGroup;
  arreAux: File[] = [];
  mensaje:string = '';

constructor(
  public formBuilder: FormBuilder,
  public fireservice:FirebaseService,
  public funService:FuncionsService,
  private ruta:Router,
  private rutaActiva:ActivatedRoute) { 
    this.creaFormulario();
    this.fireservice.listaArchivos = [];
    this.cargarData();
  }
  
  ngOnInit(): void {
  }

  // recuperar datos por id a editar y cargarlos
  cargarData(){
    this.id = this.rutaActiva.snapshot.paramMap.get('id') as any;
    if(this.id){
      this.fireservice.getTarea(this.id).subscribe(
        (res)=>{
          this.completarFormulario(res);
        },(err)=>{ 
          this.ruta.navigateByUrl('tareas');
          console.log(err) 
        }
      )
    }

  }

  completarFormulario(tarea:Tarea){
    this.tituloFormulario = 'Editar tarea';
    this.mensajeButton = 'Actualizar tarea'
    this.formularioAdd.controls['titulo'].setValue(tarea.titulo);
    this.formularioAdd.controls['descripcion'].setValue(tarea.descripcion);
    this.formularioAdd.controls['tiempoTarea'].setValue(tarea.tiempoTarea);
    // verificar si existe listafiles
    if(!tarea.listaFiles){ 
      tarea.listaFiles = [];
      this.fireservice.listaArchivos = tarea.listaFiles;
    } 
    this.fireservice.listaArchivos = tarea.listaFiles;
  }
  
  creaFormulario(){
    this.formularioAdd = this.formBuilder.group({
      titulo:['',Validators.required],
      descripcion:['',Validators.required],
      tiempoTarea:['',Validators.required]
    })
  }
  
guardar(){
  
  if(this.formularioAdd.invalid){
    Object.values(this.formularioAdd.controls).forEach(control=>{
      control.markAllAsTouched();
    })
    return;
  }

  // preparando la data
  this.cargandoGuardar = true;
  this.mensajeButton = 'Guardando';
  const tarea = new Tarea();
  tarea.titulo = this.formularioAdd.value.titulo;
  tarea.descripcion = this.formularioAdd.value.descripcion;
  tarea.tiempoTarea = this.formularioAdd.value.tiempoTarea;
  tarea.listaFiles = this.fireservice.listaArchivos;
  tarea.imagen = this.funService.imgHome;

  if(!this.id){
    this.fireservice.guardarData(tarea)
        .subscribe( 
          (res)=>{
          this.cargandoGuardar = false
          this.vistaMensaje = true;
          this.mensaje = 'Tarea guardada correctamente';
          this.mensajeButton = 'Guardar tarea'
          this.cancelar();
          setTimeout(() => this.vistaMensaje = false, 3000);
        },(err)=>{ console.log(err) })

  } else {
    tarea.id = this.id;
    this.mensajeButton = 'Actualizando tarea'
    this.fireservice.updateTarea(tarea)
        .subscribe(
          (res)=>{
            this.cargandoGuardar = false
            this.vistaMensaje = true;
            this.mensaje = 'Tarea actualizado correctamente';
            this.mensajeButton = 'Actualizar tarea'
            setTimeout(() => this.vistaMensaje = false, 3000);
          },(err)=>{ console.log(err) }
        )
  }

}

cancelar(){
  if(this.id){
    this.ruta.navigateByUrl('tareas')
  } else{
    this.formularioAdd.reset();
    this.fireservice.listaArchivos.length = 0;
  }
}

// validadores campos
get validarTitulo(){
  return this.formularioAdd.controls['titulo'].touched && this.formularioAdd.controls['titulo'].invalid;
}
get validarDescripcion(){
  return this.formularioAdd.controls['descripcion'].touched && this.formularioAdd.controls['descripcion'].invalid;
}
get validarFecha(){
  return this.formularioAdd.controls['tiempoTarea'].touched && this.formularioAdd.controls['tiempoTarea'].invalid;
}

}
