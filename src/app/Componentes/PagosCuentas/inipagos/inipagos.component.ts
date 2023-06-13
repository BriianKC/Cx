import { Component, OnInit } from '@angular/core';
import {
  facturaDet,
  ClienteLocalService,
  ReporteFacturasService,
} from 'src/app/Services/equipo.service';
import { ExporterService } from "src/app/Services/Export.Service";
@Component({
  selector: 'app-inipagos',
  templateUrl: './inipagos.component.html',
  styleUrls: ['./inipagos.component.css'],
})
export class InipagosComponent implements OnInit {
  ListarClientes: any;
  ListarFacturas: facturaDet[] = [];
  selectedValue = '';
  mensaje = '';

  constructor(
    private clienteLocalService: ClienteLocalService,
    private reporteFacturasService: ReporteFacturasService,
    private exporterService: ExporterService,

  ) { }

  ngOnInit(): void {
    this.listaFacturas();
    this.listarClientes();
  }

  listaFacturas() {
    this.reporteFacturasService.getFacturasTotal().subscribe((response) => {
      this.ListarFacturas = <any>response;
      return (this.mensaje = 'Lista total de cobros');
    });
  }

  exportAsXLSX(){
    if (this.ListarFacturas.length == 0 || this.ListarFacturas.length == null) {
      return (this.mensaje ='El cliente no tiene pagos');
    } else {
      this.exporterService.exportToExcel(this.ListarFacturas,'my_export');
      return (this.mensaje = 'Lista de cobros de: '+this.selectedValue);
    }
  }

  buscarFacturas(event: Event) {
    if (this.selectedValue == '' || this.selectedValue == '---Todos Los Cobros----')
    {
      this.listaFacturas();
    } else {
      this.reporteFacturasService.getFacturasId(this.selectedValue).subscribe((response) => {
          this.ListarFacturas = <any>response;
          if (this.ListarFacturas.length == 0 || this.ListarFacturas.length == null) {
            console.log(this.ListarFacturas.length);
            return (this.mensaje ='El cliente no tiene pagos');
          } else {
            return (this.mensaje = 'Lista de cobros de: '+this.selectedValue);
          }
      });
    }
  }

  listarClientes() {
    this.clienteLocalService.getClientes().subscribe(
      (data) => {
        this.ListarClientes = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
