import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';


@Component({
  selector: 'app-mnt-principal',
  templateUrl: './mnt-principal.component.html',
  styleUrls: ['./mnt-principal.component.css']
})
export class MntPrincipalComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fapi:FapiRestService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.listarEstado();
    this.listarPrincipal();
  }
  verBotonPreview=false;
  verBotonRegistrar=false;
  verBotonActualizar=false;
  verPreview=false;
  verTabla=true;
  titleModal="";
  arrayPrincipal:any;
  arrayRedes:any;
  objEstado:any;
  objPrincipal={
    idprincipal:0,
    nombre:'',
    descripcion:'',
    foto:'',
    estado:0,
    opcion:0
  }
  objRedes={
    idredes:0,
    titulo:'',
    clases:'',
    ruta:'',
    style:'',
    idprincipal:0,
    estado:0,
    opcion:0
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.titleModal="::Registrar Principal::";
    this.verBotonRegistrar=true;
    this.verBotonActualizar=false;
  }
  //cerrar venatana
  closeModal(): void {
    this.modalService.hide();
  }

  registrarPrincipal(){
    if(this.files.length>0){
      this.objPrincipal.opcion=1;
      this.objPrincipal.foto=this.files[0].name;
      this.fapi.fapiPost("addPrincipal",this.objPrincipal).subscribe(x=>{
        if(x=='ok'){
          this.subirImagen();
          this.toast.success('Se registro correctamente.','¡AVISO!');
          this.listarPrincipal();
          this.closeModal();
        }
      })
    }
    else{
      this.toast.warning('Ingresar una imagen.','¡AVISO!');
      return;
    }
  }
  files: File[] = [];
  onSelect(event){
    if(this.files.length<1){
      this.files.push(...event.addedFiles);
      }
  }
  subirImagen(){
    const formData=new FormData();
    formData.append('archivo',this.files[0]);
    this.fapi.fapiPost('subirFoto',formData) .subscribe(x=>{
    })
  }

  listarPrincipal(){
    this.objPrincipal.opcion=5;
    this.fapi.fapiGetParameter("listarPrincipal",this.objPrincipal.opcion+'/'+this.objPrincipal.estado).subscribe(x=>{
      this.arrayPrincipal=x[0];
      for (let i = 0; i < this.arrayPrincipal.length; i++) {
        this.arrayPrincipal[i].foto=RutaImg+this.arrayPrincipal[i].foto;
      }
    })
  }
  nombreDato:string="";
  openModalEliminacion(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=x.descripcion;
    this.objPrincipal.idprincipal=x.idprincipal;
  }
  openModalActivar(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=x.descripcion;
    this.objPrincipal.idprincipal=x.idprincipal;
  }
  eliminarPrincipal(){
    this.objPrincipal.opcion=4;
    this.fapi.fapiPut('removePrincipal',this.objPrincipal).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se activo correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarPrincipal();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
  eliminarRedes(idredes){
    this.objRedes.opcion=3;
    this.objRedes.idredes=idredes;
    this.fapi.fapiPut('removeRedes',this.objRedes).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se elimino correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarDetalleRedes(this.objRedes.idprincipal);
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
  activarRedes(idredes){
    this.objRedes.opcion=4; 
    this.objRedes.idredes=idredes;
    this.fapi.fapiPut('activateRedes',this.objRedes).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se activo correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarDetalleRedes(this.objRedes.idprincipal);
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }

  activarPrincipal(){
    this.objPrincipal.opcion=3;
    this.fapi.fapiPut('activatePrincipal',this.objPrincipal).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se elimino correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarPrincipal();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
  actualizarPrincipal(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.objPrincipal.idprincipal=x.idprincipal;
    this.objPrincipal.nombre=x.nombre;
    this.objPrincipal.descripcion=x.descripcion;
    this.objPrincipal.foto=x.foto;
    this.obtenerFotoServer();
    this.verBotonRegistrar=false;
    this.verBotonActualizar=true;
    this.titleModal="::Actualizar Principal::";
  }
  verBotonRegRedes=false;
  verBotonActualizarRedes=false;
  RegistrarRed(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.titleModal="::Registrar Redes::";
    this.objRedes.idprincipal=x.idprincipal;
    this.verBotonRegRedes=true;
    this.verBotonActualizarRedes=false;
  }
  DetallesRedes(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
    this.titleModal="::Detalle Redes::";
    this.objRedes.idprincipal=x.idprincipal;
    this.listarDetalleRedes(this.objRedes.idprincipal);
  }
  RegistrarRedes(){
    this.objRedes.opcion=1;
    this.fapi.fapiPost("addRedes",this.objRedes).subscribe(x=>{
      if(x=='ok'){
        this.toast.success('Se registro correctamente.','¡AVISO!');
        this.limpiarTexto();
        this.listarPrincipal();
        this.closeModal();
      }
    })
  }
  limpiarTexto(){
    this.objRedes.idredes=0;
    this.objRedes.titulo='';
    this.objRedes.clases='';
    this.objRedes.ruta='';
    this.objRedes.idprincipal=0;
    this.objRedes.estado=0;
    this.objRedes.opcion=0;
    this.objRedes.style='';
  }
  obtenerFotoServer(){
    this.fapi.fapiGet("verFotos").subscribe(x=>{
      console.log(x);
    })
  }
  listarEstado(){
    let opcion=2;
    let idMaestro=2;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objEstado=x[0];
    })
  }
  listarDetalleRedes(idprincipal){
    let opcion=5;
    this.fapi.fapiGetParameter('listarRedes',opcion+'/'+idprincipal+'/'+0).subscribe(x=>{
      this.arrayRedes=x[0];
    })
  }
  updatePrincipales(){
    this.objPrincipal.opcion=2;
    if(this.files.length>0){
      this.objPrincipal.foto=this.files[0].name;
      this.fapi.fapiPut('updatePrincipal',this.objPrincipal).subscribe(response=>{
        if(response='ok'){
          this.toast.success('Se actualizo correctamente.','¡AVISO!');
          this.modalService.hide();
          this.subirImagen();
          this.listarPrincipal();
        }else{
          this.toast.warning('Algo salio mal.','¡AVISO!');
        }
      })
    }else{
      this.toast.warning('Ingresar una imagen.','¡AVISO!');
      return;
    }
  }

  openPreview(){
    this.verPreview=true;
    this.verTabla=false;
    this.verBotonPreview=true;
  }
  closePreview(){
    this.verPreview=false;
    this.verTabla=true;
    this.verBotonPreview=false;
  }

}
