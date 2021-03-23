import { Component, OnInit } from '@angular/core';
import { RutaImg } from 'src/app/Service/General';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private fapi:FapiRestService) { }
  objJobs={
    idtrabajos:0,
    titulo:'',
    descripcion:'',
    foto:'',
    estado:0,
    opcion:0
  }
  arrayJobs:any;

  ngOnInit(): void {
    this.listarJobs();
  }
  listarJobs(){
    this.objJobs.opcion=5;
    this.objJobs.estado=1;
    this.fapi.fapiGetParameter("listarJobs",this.objJobs.opcion+'/'+this.objJobs.estado).subscribe(x=>{
      this.arrayJobs=x[0];
      for (let i = 0; i < this.arrayJobs.length; i++) {
        this.arrayJobs[i].foto=RutaImg+this.arrayJobs[i].foto;
      }
    })
  }
}
