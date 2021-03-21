import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FuncionsService } from '../../services/funcions.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Remember } from 'src/app/models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variables
  formulario:FormGroup;
  usuario = new Remember;
  contador: number;

  constructor(
    public funService : FuncionsService,
    public authService: AuthService,
    private ruta:Router,
    public formbuilder:FormBuilder) {
      this.crearFormulario();
      if(this.authService.activo){
        ruta.navigateByUrl('tareas')
      }
  }
  ngOnInit(){
  }

  crearFormulario(){

    this.formulario = this.formbuilder.group({
      email:['',[ Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass:['',[Validators.required]]
    })

  }

  ingresar(){
    if(this.formulario.invalid){
      Object.values(this.formulario.controls).forEach( control =>{
        control.markAllAsTouched();
      })
      return;
    }
    this.authService.signIn(this.formulario.value.email,this.formulario.value.pass);
  }

  // validadores get 

  get validarCorreo(){
    return (this.formulario.controls['email'].dirty && this.formulario.controls['email'].invalid) || 
           (this.formulario.controls['email'].invalid && this.formulario.controls['email'].touched );
  }

  get validarEntradaPass(){
    return this.formulario.controls['pass'].touched && this.formulario.controls['pass'].invalid;
  }

  


}
