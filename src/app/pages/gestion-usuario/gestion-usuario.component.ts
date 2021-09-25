import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';


@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fapi:FapiRestService,private toast:ToastrService) {}
 
  ngOnInit(): void {
    this.listarUsuario();
  }
  mntUsuario={
    idusuario:0,
    usuario:'',
    password:'',
    nombre:'',
    apePaterno:'',
    apeMaterno:'',
    opcion:0,
    estado:0,
    contrasena:'',
    passwordNew:'',
    passwordConfirmar:''
  }
  objUsuario:any;
  nombreAccion='';
  botonAccion=false;
  openModal(template: TemplateRef<any>) {
    this.nombreAccion=":: Registrar Usuario ::";
    this.modalRef = this.modalService.show(template);
    this.botonAccion=true;
  }
  openActualizar(template:TemplateRef<any>,item){
    this.nombreAccion=":: Actualizar Usuario ::";
    this.modalRef = this.modalService.show(template);
    this.botonAccion=false;
    this.mntUsuario.idusuario=item.idusuario;
    this.mntUsuario.usuario=item.usuario;
    this.mntUsuario.nombre=item.nombre;
    this.mntUsuario.apePaterno=item.apePaterno;
    this.mntUsuario.apeMaterno=item.apeMaterno;
    this.mntUsuario.password=item.password;
    this.mntUsuario.estado=item.estado;
  }
  openActualizarPassword(template:TemplateRef<any>,item){
    this.modalRef = this.modalService.show(template);
    this.mntUsuario.password=item.password;
  }
  closeRegisterUser(): void {
    this.modalService.hide();
    this.limpiarCaja();
  }
  nombreDato="";
  openModalEl(template:TemplateRef<any>,item){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=item.usuario;
    this.mntUsuario.idusuario=item.idusuario;
  }
  updateContra(){
    if(this.mntUsuario.passwordNew===this.mntUsuario.passwordConfirmar){
      this.mntUsuario.opcion=6;
      this.fapi.fapiPut('updateContrasena',this.mntUsuario).subscribe(response=>{
        if(response=='ok'){
          this.toast.success('Se actualizo la contraseña correctamente.','¡AVISO!');
          this.closeRegisterUser();
          this.listarUsuario();
        }else{
          this.toast.warning('La contraseña que ingresaste no es la correcta','¡AVISO!');
          return;
        }
      })
    }else{
      this.toast.warning('La contraseña no coincide','¡AVISO!');
      return;
    }
  }
  updateUsuario(){
    this.mntUsuario.opcion=5;
    this.fapi.fapiPut('updateUsuario',this.mntUsuario).subscribe(response=>{
      if(response=='ok'){
        this.toast.success('Se actualizo correctamente.','¡AVISO!');
        this.closeRegisterUser();
        this.listarUsuario();
      }
    })
  }
  eliminarUsuario(){
    this.mntUsuario.opcion=4;
    console.log(this.mntUsuario);
    this.fapi.fapiPut('removeUsuario',this.mntUsuario).subscribe(response=>{
      console.log(response);
      if(response=='ok'){
        this.toast.success('Se Elimino correctamente.','¡AVISO!');
        this.closeRegisterUser();
        this.listarUsuario();
      }
    })
  }
  activarUsuario(){
    this.mntUsuario.opcion=3;
    console.log(this.mntUsuario);
    this.fapi.fapiPut('activateUsuario',this.mntUsuario).subscribe(response=>{
      console.log(response);
      if(response=='ok'){
        this.toast.success('Se activo correctamente.','¡AVISO!');
        this.closeRegisterUser();
        this.listarUsuario();
      }
    })
  }
  registrarUsuario(){
    this.mntUsuario.opcion=1;
    console.log(this.mntUsuario);
    this.fapi.fapiPost('addUsuario',this.mntUsuario).subscribe(response=>{
      console.log(response);
      if(response=='ok'){
        this.toast.success('Se registro correctamente.','¡AVISO!');
        this.closeRegisterUser();
        this.listarUsuario();
      }
    })
  }
  listarUsuario(){
    this.mntUsuario.opcion=2;
    this.fapi.fapiGetParameter('listarUsuario',this.mntUsuario.opcion+'/'+this.mntUsuario.estado).subscribe(response=>{
      this.objUsuario=response[0];
      console.log(this.objUsuario);
    })
  }
  limpiarCaja(){
    this.mntUsuario.idusuario=0;
    this.mntUsuario.nombre="";
    this.mntUsuario.password="";
    this.mntUsuario.usuario="";
    this.mntUsuario.apePaterno="";
    this.mntUsuario.apeMaterno="";
    this.mntUsuario.estado=0;
    this.mntUsuario.opcion=0;
    this.mntUsuario.passwordNew="";
  }

}
