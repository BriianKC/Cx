import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  CuentaB,
  cliente,
  clocal,
  EquipoService,
  ClienteService,
  detalle,
  DetalleService,
  cabecera,
  CobroService,
  FacturasService,
  facturas,
  ClienteLocalService,
} from 'src/app/Services/equipo.service';

@Component({
  selector: 'app-agr-cobros',
  templateUrl: './agr-cobros.component.html',
  styleUrls: ['./agr-cobros.component.css'],
})
export class AgrCobrosComponent implements OnInit {
  cabecera: cabecera = {
    idPC: '',
    descripcionPC: '',
    fechaPC: '',
    totalPD: 0,
    cedulaCli: '',
    idCB: '',
  };

  clocal: clocal = {
    cedulaCli: '',
    nombresCli: '',
    totalPagarCre: 0,
    saldo: 0,
  };

  cliente: cliente = {
    cliIdentification: '',
    cliName: '',
    cliBirthday: '',
    cliAddres: '0',
    cliPhone: '',
    cliMail: '',
  };

  detalle: detalle = {
    idPD: '',
    saldoFac: 0,
    idCabecera: '11',
    numeroFac: 0,
    valorApagar: 0,
  };

  ListarClientes: cliente[] = [];
  ListarCuentas: CuentaB[] = [];
  ListarFacturas: facturas[] = [];
  ListarCabeceras: cabecera[] = [];
  ListarDetalles: detalle[] = [];
  LDetalles: [] = [];

  cobro!: FormGroup;
  idCP = Math.floor(Math.random() * 999) + 1;
  idCobro = 'PAG-CLI-0000';
  fechaPC: string = new Date().toDateString();
  totalCob = 0;

  mensaje = '';
  mensajef = '';

  facturaSelec: any;
  idFac = 0;
  totalFac = 0;
  saldoFac = 0;
  pago = 0;
  totalPagarCre = 0;
  x = 0;
  y = 0;

  constructor(
    private EquipoService: EquipoService,
    private ClienteService: ClienteService,
    private clService: ClienteLocalService,
    private detalleService: DetalleService,
    private CobroService: CobroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private facturasService: FacturasService
  ) {
    this.formCobro();
  }

  ngOnInit(): void {
    this.listarCuentasBancarias(),
      this.listarClientes(),
      this.listarCabeceras(),
      console.log(this.fechaPC);


  }

  private formCobro() {
    this.cobro = this.formBuilder.group({
      descripcionPC: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[A-Za-z]+(\s{1}[A-Za-z]+)*$/),
        ],
      ],
      cedulaCli: ['', [Validators.required]],
      idCB: ['', [Validators.required]],
      pago: [
        '',
        [Validators.pattern(/^[^++--]+$/)]
      ],
    });
  }

  listarCabeceras() {
    this.CobroService.getCobros().subscribe(
      (data) => {
        this.ListarCabeceras = <any>data;
        this.y = this.ListarCabeceras.length + 1;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Agregar(event: Event) {
    if (this.ListarDetalles.length > 0 && this.totalCob > 0) {
      const value = this.cobro.value;
      let clienteSel = this.ListarClientes.find(
        (a) => a.cliIdentification == value.cedulaCli
      );
      let id = '' + clienteSel?.cliIdentification;
      this.clService.getCliente(id).subscribe(
        (data) => {
          if (data == null) {
            this.x = 0;
            const ncliente = {
              cedulaCli: '' + clienteSel?.cliIdentification,
              nombresCli: '' + clienteSel?.cliName,
              totalPagarCre: this.totalPagarCre,
              saldo: this.x + this.totalCob,
            };
            this.clService.addCliente(ncliente).subscribe();
          } else {
            this.clocal = <any>data;
            this.x = this.clocal.saldo;
            const ncliente = {
              cedulaCli: '' + clienteSel?.cliIdentification,
              nombresCli: '' + clienteSel?.cliName,
              totalPagarCre: this.totalPagarCre,
              saldo: this.x + this.totalCob,
            };
            this.clService.addCliente(ncliente).subscribe();
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.ListarDetalles.forEach((detalle) => {
        this.detalleService.addDetalle(detalle).subscribe((response) => {
        });
      });
      const cabeceran = {
        idPC: this.idCobro + '' + this.y,
        descripcionPC: '' + value.descripcionPC,
        fechaPC: '2023-02-15',
        totalPD: this.totalCob,
        cedulaCli: '' + value.cedulaCli,
        idCB: '' + value.idCB,
      };
      this.CobroService.addCobro(cabeceran).subscribe();
      setTimeout(() => {
        this.router.navigate(['/iniCobros']);
      }, 2300);
      return (this.mensajef = 'Cobro Guardado');
    } else {
      return (this.mensajef = 'No se agrego ningun cobro O el TOTAL debe ser Mayor a O');
    }
  }

  agregarDetalle() {
    const value = this.cobro.value;
    if ( value.pago == 0)
      return (this.mensaje = 'Digite un Número Válido');
    else if (value.pago <= this.saldoFac) {
      const ndetalle: detalle = {
        idPD: '',
        saldoFac: this.saldoFac - value.pago,
        idCabecera: this.idCobro + '' + this.y,
        numeroFac: this.idFac,
        valorApagar: value.pago,
      };
      this.cobro.patchValue({ pago: '' });
      this.idFac = 0;
      this.totalFac = 0;
      this.saldoFac = 0;
      let existe =
        this.ListarDetalles.filter((d) => d.numeroFac === ndetalle.numeroFac)
          .length > 0;
      if (!existe) {
        this.ListarDetalles.push(ndetalle);
        this.totalCob = this.ListarDetalles.reduce(
          (acc, index) => acc + index.valorApagar,
          0
        );
        return (this.mensaje = 'Detalle Agregado');
      } else
        return (this.mensaje =
          'La factura ya existe');
    } else {
      return (this.mensaje = 'EL pago es mayor que saldo de la factura O seleccione una factura');
    }
  }

  eliminar(index: number) {
    this.ListarDetalles.splice(index, 1);
    this.totalCob = this.ListarDetalles.reduce(
      (acc, index) => index.valorApagar - acc,
      0
    );
  }

  selecionaFactura(facturas: any) {
    this.facturaSelec = facturas;
    this.idFac = this.facturaSelec.invoiceHeadId;
    this.totalFac = this.facturaSelec.invoiceTotal;
    this.detalleService.getFactura(this.idFac).subscribe(
      (data) => {
        if (data == null) {
          this.saldoFac = this.totalFac;
        } else {
          this.detalle = <any>data;
          this.saldoFac = this.detalle.saldoFac;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clienteSelect(event: Event) {
    const value = this.cobro.value;
    this.facturasService.getfactura(value.cedulaCli).subscribe(
      (res) => {
        this.ListarFacturas = <any>res;
        this.totalPagarCre = this.ListarFacturas.reduce(
          (acc, index) => acc + index.invoiceTotal,
          0
        );
      },
      (err) => console.log(err)
    );
    this.idFac = 0;
    this.totalFac = 0;
    this.saldoFac = 0;
  }

  cuentaSelect(event: Event) {
    const value = this.cobro.value;
  }

  listarClientes() {
    this.ClienteService.getClietes().subscribe(
      (data) => {
        this.ListarClientes = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listarCuentasBancarias() {
    this.EquipoService.getCuentasBancarias2().subscribe(
      (data) => {
        this.ListarCuentas = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
