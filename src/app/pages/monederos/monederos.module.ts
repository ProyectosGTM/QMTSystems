import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonederosRoutingModule } from './monederos-routing.module';
import { ListaMonederosComponent } from './lista-monederos/lista-monederos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListaMonederosComponent],
  imports: [
    CommonModule,
    MonederosRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class MonederosModule { }
