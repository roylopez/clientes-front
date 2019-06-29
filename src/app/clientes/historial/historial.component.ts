import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tarjeta } from '../../tarjetas/tarjeta';
import { TarjetasService } from '../../tarjetas/tarjetas.service';

/**Componente que permite visualizar el historial de consumo para todas las tarjetas de un cliente*/
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  tarjetas: Tarjeta[];

  constructor(
    private tarjetasService: TarjetasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarTarjetas();
  }

  public cargarTarjetas(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.tarjetasService.getTarjetas(id).subscribe(tarjetas => this.tarjetas = tarjetas);
      }
    });
  }

}
