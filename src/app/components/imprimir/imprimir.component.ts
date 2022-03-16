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
    // this.fireService.listaArchivos = [];
    this.listaArchivos();
  }

  ngOnInit(): void {
  }

  guardar(){

    if(this.fireService.listaArchivos.length==0){
      return;
    }

    const archivo = new Archivo();
    this.cargandoGuardado = true
    archivo.listaArchivo = this.fireService.listaArchivos;

    this.fireService.uploadFilesPrint(archivo).then( (res:any)=>{

        const id:string = res._delegate._key.path.segments[1]
        this.fireService.updateId(id).then( res => {
          // this.listaArchivos();
          this.avisoGuardado = true;
          this.cargandoGuardado = false;
          console.log('update id: ', id)

          this.cancelar();
          setTimeout(() => this.avisoGuardado = false, 2000);

        }).catch( err => {

          this.cargandoGuardado = false;
          this.avisoGuardado = false
          console.log(err)

        });

      },(err)=>{

        this.cargandoGuardado = false;
        this.avisoGuardado = false

        console.log(err)

      }
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

  eliminarPrint(key:string){

    this.fireService.deleteFilesPrint(key).then(
      (res)=>{
        console.log('Eliminado correctamente')
      },(err)=>{ console.log(err) })

  }

  cancelar(){
    this.fireService.listaArchivos = [];
  }

  get validarDescripion(){
    return this.formulario.controls['descripcion'].touched && this.formulario.controls['descripcion'].invalid;
  }

  fileFormat(name:string){

    let  split = name.split('.');
    // let type = '';
    const  res = split[1];

    if(res=='pdf'){
      return 'fa-file-pdf'
    }

    if(res=='png' || res=='jpg'){
      return 'fa-file-image'
    }

    if(res=='docx'){
      return 'fa-file-word'
    }

    if(res=='xlsx'){
      return 'fa-file-spreadsheet'
    }

    return 'fa-file-alt';

  }

}
