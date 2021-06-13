import { Component, OnInit } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private fapi:FapiRestService,private toast:ToastrService) { }

  ngOnInit(): void {
  }
  objEmail={
    nombre:'',
    email:'',
    empresa:'',
    descripcion:''
  }

  enviarCorreo(){
    if(this.objEmail.nombre=="" || this.objEmail.email=="" || this.objEmail.empresa=="" || this.objEmail.descripcion=="")
    {
      this.toast.warning("Ingresar los datos correctos para el envio de correo.");
    }else{
      this.fapi.fapiPost('sendEmail',this.objEmail).subscribe(response=>{
        if(response=='ok'){
          this.toast.success('Se envió el correo correctamente.','¡AVISO!');
        }
        this.limpiarText();
      })
    }
  }
  limpiarText(){
    this.objEmail.nombre='';
    this.objEmail.email='';
    this.objEmail.empresa='';
    this.objEmail.descripcion='';
  }


}
