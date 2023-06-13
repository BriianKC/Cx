import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Componentes/cuentasBancarias/inicio/inicio.component';
import { AgregarComponent } from './Componentes/cuentasBancarias/agregar/agregar.component';
import { ModificarComponent } from './Componentes/cuentasBancarias/modificar/modificar.component';

import {  IniCobrosComponent } from './Componentes/Cobros/ini-cobros/ini-cobros.component';
import {  AgrCobrosComponent } from './Componentes/Cobros/agr-cobros/agr-cobros.component';

import { IniClienteComponent } from './Componentes/Clientes/ini-cliente/ini-cliente.component';
import { ModClienteComponent } from './Componentes/Clientes/mod-cliente/mod-cliente.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { InideudoresComponent } from './Componentes/Deudores/inideudores/inideudores.component';
import { InipagosComponent } from './Componentes/PagosCuentas/inipagos/inipagos.component';
import { ImprimirComponent } from './Componentes/Cobros/imprimir/imprimir.component'; // <-- import the module
import { ExporterService } from './Services/Export.Service';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AgregarComponent,
    ModificarComponent,
    IniCobrosComponent,
    AgrCobrosComponent,
    IniClienteComponent,
    ModClienteComponent,
    InideudoresComponent,
    InipagosComponent,
    ImprimirComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ExporterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
