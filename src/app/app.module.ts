import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage'
// spinner
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AddTareaComponent } from './modals/add-tarea/add-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// http
import { HttpClientModule } from '@angular/common/http'
import { from } from 'rxjs';
import { BuscarTareaPipe } from './pipes/buscar-tarea.pipe';
import { ImprimirComponent } from './components/imprimir/imprimir.component';
import { CargaArchivosComponent } from './components/carga-archivos/carga-archivos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TareasComponent,
    LoginComponent,
    NavbarComponent,
    AddTareaComponent,
    BuscarTareaPipe,
    ImprimirComponent,
    CargaArchivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
