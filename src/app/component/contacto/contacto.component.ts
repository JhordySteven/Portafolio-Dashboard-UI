import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private fapi:FapiRestService) { }

  ngOnInit(): void {
  }
  objEmail={
    nombre:'',
    email:'',
    empresa:'',
    descripcion:''
  }

  enviarCorreo(){
    this.fapi.fapiPost('sendEmail',this.objEmail).subscribe(response=>{
      console.log(response);
      this.limpiarText();
    })
  }
  limpiarText(){
    this.objEmail.nombre='';
    this.objEmail.email='';
    this.objEmail.empresa='';
    this.objEmail.descripcion='';
  }


}
