import { Component, OnInit } from '@angular/core';
import { cabecera, CobroService, detalle, DetalleService } from 'src/app/Services/equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ini-cobros',
  templateUrl: './ini-cobros.component.html',
  styleUrls: ['./ini-cobros.component.css']
})
export class IniCobrosComponent implements OnInit {

  ListarCabeceras:cabecera[]=[];
  ListarDetalles:detalle[]=[];

  constructor(private CobroService:CobroService, private Router:Router, private detalleService:DetalleService) {}

  ngOnInit(): void {
    this.listarCabeceras();
  }
  listarCabeceras() {
    let n;
    this.CobroService.getCobros().subscribe((data) => {
      this.ListarCabeceras=<any>data;
      n=this.ListarCabeceras.length;
    }, error=>{
      console.log(error);
    })
  }

  imprimir(idC:string){
    this.Router.navigate(['/imprimir/'+idC]);
  }



}
