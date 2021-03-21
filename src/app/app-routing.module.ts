import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { LoginComponent } from './components/login/login.component';
import { AddTareaComponent } from './modals/add-tarea/add-tarea.component';
import { ImprimirComponent } from './components/imprimir/imprimir.component';

const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'tareas',component: TareasComponent },
  { path:'add-tarea',component: AddTareaComponent },
  { path:'editar/:id',component: AddTareaComponent },
  { path:'imprimir',component: ImprimirComponent },
  { path:'login',component: LoginComponent },
  { path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
