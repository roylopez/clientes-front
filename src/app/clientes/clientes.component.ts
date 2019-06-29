import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente';
import alert from 'sweetalert2';

/**Componente que permite acceder a la lista de clientes*/
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.clientesService.getClientes().subscribe(clientes => this.clientes = clientes);
  }

  delete(id: number): void {
    this.clientesService.delete(id).subscribe(cliente => {
      this.clientes = this.clientes.filter(clienteFiltro => clienteFiltro.id !== id);
      alert.fire('Cliente Eliminado', `Cliente ${cliente.nombre} eliminado`, 'success');
    },
    err => {
      alert.fire('Cliente', 'Error al eliminar el cliente', 'error');
    });
  }

}
