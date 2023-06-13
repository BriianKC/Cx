import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AgregarComponent } from './Componentes/cuentasBancarias/agregar/agregar.component';
import { InicioComponent } from './Componentes/cuentasBancarias/inicio/inicio.component';
import { ModificarComponent } from './Componentes/cuentasBancarias/modificar/modificar.component';

import { IniCobrosComponent } from './Componentes/Cobros/ini-cobros/ini-cobros.component';
import { AgrCobrosComponent} from './Componentes/Cobros/agr-cobros/agr-cobros.component';

import { IniClienteComponent } from './Componentes/Clientes/ini-cliente/ini-cliente.component';
import { ModClienteComponent } from './Componentes/Clientes/mod-cliente/mod-cliente.component';
import { InideudoresComponent } from './Componentes/Deudores/inideudores/inideudores.component';
import { InipagosComponent } from './Componentes/PagosCuentas/inipagos/inipagos.component';
import { ImprimirComponent } from './Componentes/Cobros/imprimir/imprimir.component';


const routes: Routes = [
  { path:'',redirectTo:'/', pathMatch:'full' },
  { path:'inicio', component:InicioComponent },
  { path:'add', component:AgregarComponent },
  { path:'edit/:id', component:ModificarComponent},
  { path:'iniCobros', component:IniCobrosComponent},
  { path:'agrCobros', component:AgrCobrosComponent},
  { path:'iniCliente', component:IniClienteComponent},
  { path:'modCliente', component:ModClienteComponent},
  { path:'inideudores', component:InideudoresComponent},
  { path:'inipagos', component:InipagosComponent},
  { path:'imprimir/:idC', component:ImprimirComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
