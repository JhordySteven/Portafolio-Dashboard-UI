import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private fapi:FapiRestService,private toast:ToastrService) { }


  ngOnInit(): void {
    this.listarPrincipal();
  }
  objPrincipal={
    idprincipal:0,
    nombre:'',
    descripcion:'',
    foto:'',
    estado:0,
    opcion:0
  }
  arrayPrincipal:any;
  arrayRedes:any;

  listarPrincipal(){
    this.objPrincipal.opcion=5;
    this.objPrincipal.estado=1;
    this.fapi.fapiGetParameter("listarPrincipal",this.objPrincipal.opcion+'/'+this.objPrincipal.estado).subscribe(x=>{
      this.arrayPrincipal=x[0];
      for (let i = 0; i < this.arrayPrincipal.length; i++) {
        this.arrayPrincipal[i].foto=RutaImg+this.arrayPrincipal[i].foto;
      }
      this.listarDetalleRedes(this.arrayPrincipal[0].idprincipal);
    })
  }
  listarDetalleRedes(idprincipal){
    let opcion=5;
    this.fapi.fapiGetParameter('listarRedes',opcion+'/'+idprincipal+'/'+1).subscribe(x=>{
      this.arrayRedes=x[0];
    })
  }
}
