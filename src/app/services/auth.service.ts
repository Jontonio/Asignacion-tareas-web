import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  activo : boolean = false;
  mensaje: string = '';
  vista  : boolean = false;

  constructor(
              private auth:AngularFireAuth, 
              private ruta:Router,
              public spinner: NgxSpinnerService) { this.isActive(); }

  signIn(email:string, password:string){
    this.spinner.show();
    this.mensaje = "Ingresando";
    this.auth.signInWithEmailAndPassword(email,password)
             .then( res =>{
               this.spinner.hide();
               this.ruta.navigateByUrl('tareas')
              })
              .catch( err =>{
               this.spinner.hide();
               this.mensaje = "Usuario o password incorrectos";
               this.vista = true;
               setTimeout(() => this.vista = false, 3500);
             })
             .finally();
  }

  logout(){
    this.spinner.show();
    this.mensaje = "Cerrando sesión";
    this.auth.signOut()
             .then( res =>{
               this.spinner.hide();
               this.ruta.navigateByUrl('login')
             })
             .catch( err =>{
               console.log(err)
             })
  }

  async isActive(){
    await this.auth.authState.subscribe(
      (res)=>{
        if(res===null){
          this.activo = false
        } else {
          this.activo = true
        }
      });
  }


}
