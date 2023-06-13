import { Component, OnInit } from '@angular/core';
import {
  cabecera,
  detalle,
  ClienteLocalService,
  CobroService,
  DetalleService,
  clocal,
} from 'src/app/Services/equipo.service';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css'],
})
export class ImprimirComponent implements OnInit {
  clocal: clocal = {
    cedulaCli: '',
    nombresCli: '',
    totalPagarCre: 0,
    saldo: 0,
  };
  cabecera: cabecera = {
    idPC: '',
    descripcionPC: '',
    fechaPC: '',
    totalPD: 0,
    cedulaCli: '',
    idCB: '',
  };

  ListarDetalles: detalle[] = [];
  doc: any = new jsPDF('portrait', 'pt');
  constructor(
    private cobroService: CobroService,
    private detalleService: DetalleService,
    private clienteLocalService: ClienteLocalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id_entrada = this.activatedRoute.snapshot.params['idC'];
    if (id_entrada) {
      this.cobroService.getCobro(id_entrada).subscribe(
        (res) => {
          this.cabecera = <any>res;
          this.clienteLocalService.getCliente(this.cabecera.cedulaCli).subscribe(
      (res) => {
        this.clocal = <any>res;
        this.imprimirPDF();
      },
      (err) => console.log(err)
    );
        },
        (err) => console.log(err)
      );
      this.detalleService.getDetalle(id_entrada).subscribe((res) => {
        this.ListarDetalles = <any>res;
      });
    }


  }


  imprimirPDF() {
    let detalles:any = [];
    this.ListarDetalles.forEach(detalle => {
      detalles.push([detalle.numeroFac,'$'+detalle.saldoFac,'$'+detalle.valorApagar]);
    })
    console.log(this.ListarDetalles)
    this.doc.text('FACTURA ' + this.cabecera.idPC, 20, 20);
    this.doc.text('CEDULA: ' + this.cabecera.cedulaCli, 20, 40);
    this.doc.text('NOMBRES: ' + this.clocal.nombresCli, 20, 60);
    this.doc.text('DESCRIPCION: ' + this.cabecera.descripcionPC, 20, 80);
    this.doc.text('FECHA: ' + this.cabecera.fechaPC, 20, 100);
    this.doc.text('CUENTA BANCARIA: ' + this.cabecera.idCB, 20, 120);
    this.doc.autoTable({head: [['Numero Factura',	'Saldo Factura'	,'Pago Cobro']],
    body: detalles,
    startY:140
  })
    this.doc.addPage();
    this.doc.save('Test.pdf');
  }

}
