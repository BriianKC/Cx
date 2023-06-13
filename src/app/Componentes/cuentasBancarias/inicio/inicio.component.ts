import { Component, OnInit } from '@angular/core';
import { CuentaB, EquipoService } from 'src/app/Services/equipo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  p: number =1;
  ListarCuentas:CuentaB[]=[];

  constructor(private EquipoService: EquipoService, private Router:Router) {}

  ngOnInit(): void {
    this.listarCuentasBancarias();
  }

  listarCuentasBancarias() {
    this.EquipoService.getCuentasBancarias().subscribe((data) => {
      this.ListarCuentas=<any>data;
    }, error=>{
      console.log(error);
    })
  }

  modificar(idCB:string){
    this.Router.navigate(['/edit/'+idCB]);
  }



}
