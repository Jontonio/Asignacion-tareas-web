import { Component, OnInit } from '@angular/core';
import { FuncionsService } from 'src/app/services/funcions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  anio = new Date().getFullYear();
  constructor(public funService:FuncionsService) {
  }

  ngOnInit(): void {
  }


}
