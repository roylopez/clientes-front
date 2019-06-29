import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import alert from 'sweetalert2';

/**Componente que permite realizar el registro y actualización para los clientes*/
@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {

  titulo: string = "Gestionar Cliente";
  cliente: Cliente = new Cliente();
  errores: string[];

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clientesService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  public create(): void {
    this.clientesService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        alert.fire('Nuevo Cliente', `Cliente ${cliente.nombre} registrado`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public update(): void {
    this.clientesService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        alert.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

}
