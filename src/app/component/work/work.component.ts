import { Component, OnInit } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(private fapi:FapiRestService) { }

  ngOnInit(): void {
    this.listarWork();
  }
  mntWork={
    idWork:0,
    nombre:'',
    estudio:'',
    fechaInicio:'',
    fechaFin:'',
    imagen:'',
    estado:0,
    opcion:0
  }
  ObjWork:any;

  listarWork(){
    this.mntWork.opcion=2;
    this.mntWork.estado=1;
    this.fapi.fapiGetParameter('listWork',this.mntWork.opcion+'/'+this.mntWork.estado).subscribe(x=>{
        this.ObjWork=x[0];
        for (let i = 0; i < this.ObjWork.length; i++) {
          this.ObjWork[i].imagen=RutaImg+this.ObjWork[i].imagen;
        }
    })
  }

}
