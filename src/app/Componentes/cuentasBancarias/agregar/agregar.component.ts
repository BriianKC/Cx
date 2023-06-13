import { Component, OnInit } from '@angular/core';
import { CuentaB, EquipoService } from 'src/app/Services/equipo.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,

} from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  cuentaB: CuentaB = {
    idCB: '',
    nombreCB: '',
    entidadCB: '',
    descripcionCB: '',
    estadoCB: true,
  };
    ListarCuentas:CuentaB[]=[];
    y = 0;
    idCuenta = 'CTA-BAN-00';
  cuenta!: FormGroup;

  constructor(
    private EquipoService: EquipoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formCuenta();
  }
  ngOnInit(): void {this.listarCuentasBancarias();}

  private formCuenta() {
    this.cuenta = this.formBuilder.group({

      nombreCB: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[A-Za-z]+(\s{1}[A-Za-z]+)*$/),
        ],
      ],
      entidadCB: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[A-Za-z]+(\s{1}[A-Za-z]+)*$/),
        ],
      ],
      descripcionCB: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[A-Za-z]+(\s{1}[A-Za-z]+)*$/),
        ],
      ],
      estadoCB: ['', [Validators.required]],
    });
  }

  listarCuentasBancarias() {
    this.EquipoService.getCuentasBancarias().subscribe((data) => {
      this.ListarCuentas=<any>data;
      this.y = this.ListarCuentas.length + 1;
    }, error=>{
      console.log(error);
    })
  }

  Agregar(event: Event) {
    event.preventDefault();
    if (this.cuenta.valid) {
      const value = this.cuenta.value;
      const cuentaB = {
        idCB: this.idCuenta+''+this.y,
        nombreCB: value.nombreCB,
        entidadCB: value.entidadCB,
        descripcionCB: value.descripcionCB,
        estadoCB: value.estadoCB,
      }
      this.EquipoService.addCuentasBancaria(cuentaB).subscribe();
      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 200);
    } else {
      this.cuenta.markAllAsTouched();
    }
  }
}
