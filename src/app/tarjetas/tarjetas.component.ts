import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { TarjetasService } from './tarjetas.service';
import alert from 'sweetalert2';

/**Componente que permite acceder a la lista de tarjetas asociadas a un cliente*/
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor(private tarjetasService: TarjetasService) { }

  ngOnInit() {
  }

  deleteTarjeta(id: number): void {
    this.tarjetasService.delete(id).subscribe(tarjeta => {
      this.cliente.tarjetas = this.cliente.tarjetas.filter(tarjetaFiltro => tarjetaFiltro.id !== id);
      alert.fire('Tarjeta', `Tarjeta eliminada`, 'success');
    });
  }

}
