import { Component, OnInit } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private fapi:FapiRestService) { }

  ngOnInit(): void {
    this.listarAbout();
  }
  objAbout={
    idAbout:0,
    descripcion:'',
    foto:'',
    estado:0,
    opcion:0
  }
  arrayAbout:any;
  listarAbout(){
    this.objAbout.opcion=4;
    this.fapi.fapiGetParameter("listarAbout",this.objAbout.opcion+'/'+this.objAbout.estado).subscribe(x=>{
      this.arrayAbout=x[0];
      for (let i = 0; i < this.arrayAbout.length; i++) {
        this.arrayAbout[i].foto=RutaImg+this.arrayAbout[i].foto;
      }
    })
  }
}
