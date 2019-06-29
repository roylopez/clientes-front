import { Component, OnInit } from '@angular/core';

/**Componente utilizado para centratilizar la navegación a las diferentes rutas de la aplicación*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Clientes-Front";

  constructor() { }

  ngOnInit() {
  }

}
