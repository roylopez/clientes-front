import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { AsesoresComponent } from './asesores/asesores.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionarComponent as GestionarAsesores } from './asesores/gestionar/gestionar.component';
import { GestionarComponent as GestionarClientes } from './clientes/gestionar/gestionar.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { NumeroTarjetaPipe } from './pipes/numero-tarjeta.pipe';
import { GestionarComponent as GestionarTarjetas } from './tarjetas/gestionar/gestionar.component';
import { CreditCardDirective } from './directivas/credit-card.directive';
import { ConsumosComponent } from './tarjetas/consumos/consumos.component';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { MycurrencyDirective } from './directivas/mycurrency.directive';
import { HistorialComponent } from './clientes/historial/historial.component';

const routes: Routes = [
  {path:'', redirectTo:'/clientes', pathMatch: 'full'},
  {path:'clientes', component: ClientesComponent},
  {path:'asesores', component: AsesoresComponent},
  {path:'asesores/gestionar', component: GestionarAsesores},
  {path:'asesores/gestionar/:id', component: GestionarAsesores},
  {path:'clientes/gestionar', component: GestionarClientes},
  {path:'clientes/gestionar/:id', component: GestionarClientes},
  {path:'clientes/:idcliente/tarjetas/gestionar', component: GestionarTarjetas},
  {path:'clientes/:idcliente/tarjetas/gestionar/:idtarjeta', component: GestionarTarjetas},
  {path:'clientes/historial/:id', component: HistorialComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    AsesoresComponent,
    GestionarAsesores,
    GestionarClientes,
    GestionarTarjetas,
    TarjetasComponent,
    NumeroTarjetaPipe,
    CreditCardDirective,
    ConsumosComponent,
    MycurrencyPipe,
    MycurrencyDirective,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
