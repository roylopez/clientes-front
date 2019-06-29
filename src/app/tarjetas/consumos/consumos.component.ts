import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Tarjeta } from '../tarjeta';
import { Consumo } from './consumo';
import { TarjetasService } from '../tarjetas.service';
import { MycurrencyPipe } from '../../pipes/mycurrency.pipe';
import alert from 'sweetalert2';

/**Componente que permite administrar las operaciones sobre los consumos de una tarjeta*/
@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.component.html',
  styleUrls: ['./consumos.component.css'],
  providers: [ MycurrencyPipe ]
})
export class ConsumosComponent implements OnInit {

  @Input() tarjeta: Tarjeta;
  consumoGestionado: Consumo;
  modalConsumo: boolean = false;
  errores: string[];

  constructor(private tarjetasService: TarjetasService) { }

  ngOnInit() {
    this.inicializarConsumo();
  }

  inicializarConsumo(): void {
    this.consumoGestionado = new Consumo();
    this.consumoGestionado.tarjetaId = this.tarjeta.id;
  }

  deleteConsumo(id: number): void {
    this.tarjetasService.deleteConsumo(id).subscribe(consumo => {
      this.tarjeta.consumos = this.tarjeta.consumos.filter(consumoFiltro => consumoFiltro.id !== id);
      alert.fire('Consumo', `Consumo eliminado`, 'success');
    });
  }

  public createConsumo(): void {
    this.tarjetasService.createConsumo(this.consumoGestionado).subscribe(
      consumo => {
        this.modalConsumo = false;
        this.tarjeta.consumos.push(consumo);
        this.inicializarConsumo();
        alert.fire('Nuevo Consumo', `Consumo registrado`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public updateConsumo(): void {
    this.tarjetasService.updateConsumo(this.consumoGestionado).subscribe(
      consumo => {
        this.tarjeta.consumos.map(consumoMap => {
          if(consumoMap.id == consumo.id) {
            return consumo;
          }
          return consumoMap;
        });

        this.modalConsumo = false;
        this.inicializarConsumo();
        alert.fire('Consumo', `Consumo actualizado`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  closeModal(): void {
    this.modalConsumo=false;
    this.inicializarConsumo();
  }

  seleccionConsumo(consumo: Consumo): void {
    this.consumoGestionado = consumo;
    this.modalConsumo = true;
  }

}
