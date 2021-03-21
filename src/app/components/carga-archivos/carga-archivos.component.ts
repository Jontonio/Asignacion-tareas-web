import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {

  constructor(public fireservice:FirebaseService) { }

  ngOnInit(): void {
  }

}
