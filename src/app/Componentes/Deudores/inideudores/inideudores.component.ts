import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ClienteLocalService,estado,facturaDet, ReporteFacturasService
} from 'src/app/Services/equipo.service';
import { ExporterService } from "src/app/Services/Export.Service";
@Component({
  selector: 'app-inideudores',
  templateUrl: './inideudores.component.html',
  styleUrls: ['./inideudores.component.css'],
})
export class InideudoresComponent implements OnInit {
  ListarClientes: any;
  estado !: FormGroup;
  selectedValue = "";
  ListarFacturas: facturaDet[] = [];
  mensaje ='';

  constructor(
    private ClienteService: ClienteLocalService,
    private formBuilder: FormBuilder,
    private reporteFacturasService: ReporteFacturasService,
    private exporterService: ExporterService,
  ) {this.formCobro();}

  ngOnInit(): void {
    this.listarClientes();
  }

  private formCobro() {
    this.estado = this.formBuilder.group({
      fechaIni: ['',[ Validators.required,],
      ],
      fechaFin: ['', [Validators.required]],
      cedulaCli: ['', [Validators.required]],
    });
  }

  exportAsXLSX(){
    if (this.ListarFacturas.length == 0 || this.ListarFacturas.length == null) {
      return (this.mensaje ='No hay reportes');
    } else {
      return this.exporterService.exportToExcel(this.ListarFacturas,'my_export');
    }
  }

  listaFacturasFe(event:Event){
    const value = this.estado.value;
    const inicio = new Date(value.fechaIni);
    const fin = new Date(value.fechaFin);
    const today = new Date();
    if(inicio < today || fin < today){
      this.reporteFacturasService.getFacturasRango(value.cedulaCli, value.fechaIni, value.fechaFin).subscribe((response) => {
        this.ListarFacturas = <any>response;
        if (this.ListarFacturas.length==0){
          this.mensaje='No hay reportes de: '+value.fechaFin+' A '+value.fechaIni;
        }else{
          this.mensaje='Estado de cuenta del: '+value.fechaFin+' A '+value.fechaIni;
        }
      });
    }else{
      this.mensaje='Ingrese Fechas Correctas';
      this.ListarFacturas = [];
    }

  }



  listarClientes() {
    this.ClienteService.getClientes().subscribe(
      (data) => {
        this.ListarClientes = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
