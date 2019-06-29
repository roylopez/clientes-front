import { Component, OnInit } from '@angular/core';
import { Asesor } from '../asesor';
import { AsesoresService } from '../asesores.service';
import { Router, ActivatedRoute } from '@angular/router';
import alert from 'sweetalert2';

/**Componente que permite realizar el registro y actualización de un asesor*/
@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {

  titulo: string = "Gestionar Asesor";
  asesor: Asesor = new Asesor();
  errores: string[];

  constructor(
    private asesoresService: AsesoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarAsesor();
  }

  public cargarAsesor(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.asesoresService.getAsesor(id).subscribe(asesor => this.asesor = asesor);
      }
    });
  }

  public create(): void {
    this.asesoresService.create(this.asesor).subscribe(
      asesor => {
        this.router.navigate(['/asesores']);
        alert.fire('Nuevo Asesor', `Asesor ${asesor.nombre} registrado`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public update(): void {
    this.asesoresService.update(this.asesor).subscribe(
      asesor => {
        this.router.navigate(['/asesores']);
        alert.fire('Asesor Actualizado', `Asesor ${asesor.nombre} actualizado`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

}
