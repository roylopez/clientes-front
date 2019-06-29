import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../tarjeta';
import { TarjetasService } from '../tarjetas.service';
import { Router, ActivatedRoute } from '@angular/router';
import alert from 'sweetalert2';

/**Componente que permite registrar y actualizar tarjetas*/
@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {

  titulo: string = "Gestionar Tarjeta";
  cardNumber: string = "";
  tarjeta: Tarjeta = new Tarjeta();
  errores: string[];
  clienteId: number;

  constructor(
    private tarjetasService: TarjetasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarTarjeta();
  }

  /**Método utilitario que permite transformar el número de la tarjeta para su visualización*/
  private transformCardNumber(value: string): string {
    if(value.length == 16) {
      let newValue = '';
      for(let i = 0; i < 16; i+=4) {
        newValue = newValue.concat(value.substring(i, i + 4));
        if(i < 12) {
          newValue = newValue.concat(" ");
        }
      }
      return newValue;
    }
    return value;
  }

  public cargarTarjeta(): void {
    this.activatedRoute.params.subscribe(params => {
      this.clienteId = +params['idcliente'];
      this.tarjeta.clienteId = this.clienteId;

      let id = params['idtarjeta'];
      if(id){
        this.tarjetasService.getTarjeta(id).subscribe(tarjeta => {
          this.tarjeta = tarjeta;
          this.cardNumber = this.transformCardNumber(tarjeta.numero);
        });
      }
    });
  }

  public create(): void {
    this.tarjeta.numero = this.cardNumber.replace(/\s/g, "");

    this.tarjetasService.create(this.tarjeta).subscribe(
      tarjeta => {
        this.router.navigate([`/clientes/gestionar/${this.clienteId}`]);
        alert.fire('Nueva Tarjeta', `Tarjeta registrada`, 'success');
      },
      err => {
        alert.fire('Nueva Tarjeta', `Error: ${err.error.mensaje}`, 'error');
        this.errores = err.error.errors as string[];
      }
    );
  }

  public update(): void {
    this.tarjetasService.update(this.tarjeta).subscribe(
      tarjeta => {
        this.router.navigate([`/clientes/gestionar/${this.clienteId}`]);
        alert.fire('Tarjeta', `Tarjeta actualizada`, 'success');
      },
      err => {
        alert.fire('Nueva Tarjeta', `Error: ${err.error.mensaje}`, 'error');
        this.errores = err.error.errors as string[];
      }
    );
  }

}
