import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Archivo } from 'src/app/models/archivo.models';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {
  
  formulario      :FormGroup;
  avisoGuardado   :boolean = false;
  cargandoGuardado:boolean = false
  cargandoLista   :boolean = false;
  listaArchivosPrint: Archivo[] = [];
  
  constructor(private formbuilder:FormBuilder, public fireService:FirebaseService) { 
    this.crearFormulario();
    this.fireService.listaArchivos = [];
    this.listaArchivos();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formulario = this.formbuilder.group({
      descripcion:['', Validators.required]
    })
  }

  guardar(){
    if(this.formulario.invalid){
      Object.values(this.formulario.controls).forEach(control=>{
        control.markAllAsTouched()
      })
      return;
    }
    let archivo = new Archivo();
    this.cargandoGuardado = true
    archivo.descripcion = this.formulario.value.descripcion;
    archivo.listaArchivo = this.fireService.listaArchivos;
    this.fireService.uploadFilesPrint(archivo).subscribe(
      (res)=>{
        this.listaArchivos();
        this.cancelar();
        this.avisoGuardado = true;
        this.cargandoGuardado = false;
        setTimeout(() => this.avisoGuardado = false, 2000);
      },(err)=>{ 
        this.cargandoGuardado = false;
        this.avisoGuardado = false
        console.log(err) }
    )
  }

  listaArchivos(){
    this.cargandoLista = true;
    this.fireService.getPrintArchivos().subscribe(
      (res)=>{
        this.listaArchivosPrint = res;
        this.cargandoLista = false;
      },(err)=>{ console.log(err) }
    )
  }

  eliminarPrint(key:string,indice:number){
    this.fireService.deleteFilesPrint(key).subscribe(
      (err)=>{
        this.listaArchivosPrint.splice(indice,1);
      },(err)=>{ console.log(err) })
  }

  cancelar(){
    this.fireService.listaArchivos = [];
    this.formulario.reset();
  }

  get validarDescripion(){
    return this.formulario.controls['descripcion'].touched && this.formulario.controls['descripcion'].invalid;
  }
}
