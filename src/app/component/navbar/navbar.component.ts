import { Component, OnInit } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private fapi:FapiRestService) { }

  ngOnInit(): void {
    this.listarMenu();
  }
  objMenu:any;
  listarMenu(){
    let opcion=2;
    let idMaestro=5;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objMenu=x[0];
      console.log(this.objMenu)
    })
  }
}
