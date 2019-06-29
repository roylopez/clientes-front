import { Component, OnInit } from '@angular/core';
import { AsesoresService } from './asesores.service';
import { Asesor } from './asesor';
import alert from 'sweetalert2';

/**Componente que permite acceder a la lista de asesores*/
@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.css']
})
export class AsesoresComponent implements OnInit {

  asesores: Asesor[];

  constructor(private asesoresService: AsesoresService) { }

  ngOnInit() {
    this.asesoresService.getAsesores().subscribe(asesores => this.asesores = asesores);
  }

  /**Método que permite eliminar un asesor de la lista*/
  delete(id: number): void {
    this.asesoresService.delete(id).subscribe(asesor => {
      this.asesores = this.asesores.filter(asesorFiltro => asesorFiltro.id !== id);
      alert.fire('Asesor Eliminado', `Asesor ${asesor.nombre} eliminado`, 'success');
    },
    err => {
      alert.fire('Asesor', 'Error al eliminar el asesor', 'error');
    });
  }

}
