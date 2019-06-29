import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Asesor } from './asesor';

/**Servicio utilizado para las operaciones CRUD de los asesores*/
@Injectable({
  providedIn: 'root'
})
export class AsesoresService {

  private asesoresEndPoint: string = 'http://localhost:9090/api/asesores';

  constructor(private httpClient: HttpClient) { }
  
  getAsesores(): Observable<Asesor[]> {
    return this.httpClient.get<Asesor[]>(this.asesoresEndPoint);
  }

  getAsesor(id: number): Observable<Asesor> {
    return this.httpClient.get<Asesor>(`${this.asesoresEndPoint}/${id}`);
  }

  create(asesor: Asesor): Observable<Asesor> {
    return this.httpClient.post(this.asesoresEndPoint, asesor).pipe(
      map((response: any) => response.asesor as Asesor)
    );
  }

  update(asesor: Asesor): Observable<Asesor> {
    return this.httpClient.put(`${this.asesoresEndPoint}/${asesor.id}`, asesor).pipe(
      map((response: any) => response.asesor as Asesor)
    );
  }

  delete(id: number): Observable<Asesor> {
    return this.httpClient.delete(`${this.asesoresEndPoint}/${id}`).pipe(
      map((response: any) => response.asesor as Asesor)
    );
  }

}
