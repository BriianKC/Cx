import { Component, OnInit } from '@angular/core';
import { cliente, ClienteService, facturas} from 'src/app/Services/equipo.service';
@Component({
  selector: 'app-ini-cliente',
  templateUrl: './ini-cliente.component.html',
  styleUrls: ['./ini-cliente.component.css']
})
export class IniClienteComponent implements OnInit {

  ListarClientes:any;
  ListarFacturas: facturas[] = [];
  Listar: facturas[] = [];
  constructor(
    private ClienteService: ClienteService) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.ClienteService.getClietes().subscribe((data) => {
      this.ListarClientes=<any>data;
    }, error=>{
      console.log(error);
    })
  }

}
