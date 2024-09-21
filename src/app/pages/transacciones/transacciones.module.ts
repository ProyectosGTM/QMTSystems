import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { ListaTransaccionesComponent } from './lista-transacciones/lista-transacciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListaTransaccionesComponent],
  imports: [
    CommonModule,
    TransaccionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransaccionesModule { }
