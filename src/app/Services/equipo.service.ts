import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url = 'https://cuentas2.azurewebsites.net/api/cuentab/';
  constructor(private http: HttpClient) {}
  //get Cuentas bancarias
  getCuentasBancarias(): Observable<any> {
    return this.http.get(this.url);
  }
  getCuentasBancarias2(): Observable<any> {
    return this.http.get('https://cuentas2.azurewebsites.net/api/cuentab/cc');
  }
  //get Una CB
  getCuentaBancaria(id: string) {
    return this.http.get(this.url + '/' + id);
  }
  //creat CB
  addCuentasBancaria(CuentaB: CuentaB) {
    return this.http.post(this.url, CuentaB);
  }
  //delete CB
  deleteCuentasBancaria(id: string) {
    return this.http.delete(this.url + '' + id);
  }
  //edit CB
  editCuentasBancaria(id: string, CuentaB: CuentaB) {
    return this.http.put(this.url + '' + id, CuentaB);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CobroService {
  url = 'https://cuentas2.azurewebsites.net/api/cabeceras/';
  constructor(private http: HttpClient) {}
  getCobros(): Observable<any> {
    return this.http.get(this.url);
  }
  //get Una CB
  getCobro(id: string) {
    return this.http.get(this.url + '/' + id);
  }
  getPagosCuentas(id: string) {
    return this.http.get('https://cuentas2.azurewebsites.net/api/cuentab' + '/' + id);
  }
  //creat CB
  addCobro(cabecera: cabecera) {
    return this.http.post(this.url, cabecera);
  }
  //delete CB
  deleteCobro(id: string) {
    return this.http.delete(this.url + '' + id);
  }
  //edit CB
  editCuentasBancaria(id: string, cabecera: cabecera) {
    return this.http.put(this.url + '' + id, cabecera);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'https://apifacturacion1.azurewebsites.net/api/FactClients/'
  constructor(private http: HttpClient) {   }
  getClietes(){
    return this.http.get(this.url);
  }
}

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  url = 'https://apifacturacion1.azurewebsites.net/api/FactInvoiceHeads/ListaFacturas/'
  constructor(private http: HttpClient) { }
  getfactura(id: string){
    return this.http.get(this.url+ '/' + id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClienteLocalService {
  url = 'https://cuentas2.azurewebsites.net/api/cliente/';
  constructor(private http: HttpClient) {}
  getClientes(): Observable<any> {
    return this.http.get(this.url);
  }
  //get Una CB
  getCliente(id: string) {
    return this.http.get(this.url + '/' + id);
  }
  //creat CB
  addCliente(clocal: clocal) {
    return this.http.post(this.url, clocal);
  }
}

@Injectable({
  providedIn: 'root'
})

export class DetalleService {
  url = 'https://cuentas2.azurewebsites.net/api/detalles/';
  constructor(private http: HttpClient) {}
  getDetalles(): Observable<any> {
    return this.http.get(this.url);
  }
  getDetalle(id: string) {
    return this.http.get(this.url + '/' + id);
  }
  getFactura(id: number) {
    return this.http.get( 'https://cuentas2.azurewebsites.net/api/detalles/idFac'+ '/' + id);
  }
  //creat CB
  addDetalle(detalle: detalle) {
    return this.http.post(this.url, detalle);
  }
  //delete CB
  deleteCobro(id: string) {
    return this.http.delete(this.url + '' + id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class reporteService {
  url = 'https://cuentas2.azurewebsites.net/api/detalles/';
  constructor(private http: HttpClient) {}
  getDetalles(): Observable<any> {
    return this.http.get(this.url);
  }
  getDetalle(id: string) {
    return this.http.get(this.url + '/' + id);
  }
  getFactura(id: number) {
    return this.http.get( 'https://cuentas2.azurewebsites.net/api/detalles/idFac'+ '/' + id);
  }
  //creat CB
  addDetalle(detalle: detalle) {
    return this.http.post(this.url, detalle);
  }
  //delete CB
  deleteCobro(id: string) {
    return this.http.delete(this.url + '' + id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReporteFacturasService {
  url = 'https://cuentas2.azurewebsites.net/api/cabeceras/estado';
  constructor(private http: HttpClient) {}
  getFacturasTotal(): Observable<facturaDet> {
    return this.http.get<facturaDet>('https://cuentas2.azurewebsites.net/api/cabeceras/').pipe(
      map(response => {
        return response;
      })
    );
  }
  getFacturasId(id: string): Observable<facturaDet> {
    return this.http.get<facturaDet>('https://cuentas2.azurewebsites.net/api/cabeceras/cuentab'+ '/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }
  getFacturasRango(id: string, startDate: string, endDate: string): Observable<facturaDet> {
    const url = `https://cuentas2.azurewebsites.net/api/cabeceras/estado/rango/${id}/${startDate}/${endDate}`;
    return this.http.get<facturaDet>(url).pipe(
      map(response => {
        return response;
      })
    );
  }
}

export interface estado{
  fechaIni:string,
  fechafin:string,
  cedulaCli:string
}

export interface detalleFac {
  idPD: number;
  numeroFac: number;
  valorApagar: number;
  saldoFac: number;
  idCabecera: string;
}

export interface facturaDet {
  idPC: string;
  descripcionPC: string;
  fechaPC: string;
  idCB: string;
  cedulaCli: string;
  totalPD: number;
  detalles: detalleFac[];
}


export interface CuentaB {
  idCB: string;
  nombreCB: string;
  entidadCB: string;
  descripcionCB: string;
  estadoCB: boolean;
}

export interface cabecera {
  idPC: string;
  descripcionPC: string;
  fechaPC: string;
  totalPD: number;
  cedulaCli: string;
  idCB: string;
}

export interface clocal{
  cedulaCli: string,
  nombresCli: string,
  totalPagarCre: number,
  saldo: number,
}

export interface cliente{
  cliIdentification: string,
  cliName: string,
  cliBirthday: string,
  cliAddres: string,
  cliPhone: string,
  cliMail: string,
}

export interface facturas{
  invoiceHeadId: number,
  invoiceDate: string,
  invoiceSubtotal: number,
  invoiceIva: number,
  invoiceTotal: number,
  cliIdentification: string,

}

export interface detalle{
  idPD: string,
  saldoFac:number,
  idCabecera:string
  numeroFac:number,
  valorApagar:number,
}
