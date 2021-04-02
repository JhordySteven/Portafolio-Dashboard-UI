import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';

@Component({
  selector: 'app-mnt-jobs',
  templateUrl: './mnt-jobs.component.html',
  styleUrls: ['./mnt-jobs.component.css']
})
export class MntJobsComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fapi:FapiRestService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.listarEstado();
    this.listarJobs();
  }
  verBotonPreview=false;
  verBotonRegistrar=false;
  verBotonActualizar=false;
  verPreview=false;
  verTabla=true;
  tittleModal="";
  arrayJobs:any;
  objEstado:any;
  objJobs={
    idtrabajos:0,
    titulo:'',
    descripcion:'',
    foto:'',
    estado:0,
    opcion:0
  }
  nombreDato:string="";
  
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.tittleModal="::Registrar About::";
    this.verBotonRegistrar=true;
    this.verBotonActualizar=false;
  }
  //cerrar venatana
  closeModal(): void {
    this.modalService.hide();
  }

  registrarJobs(){
    if(this.files.length>0){
      this.objJobs.opcion=1;
      this.objJobs.foto=this.files[0].name;
      this.fapi.fapiPost("addJobs",this.objJobs).subscribe(x=>{
        if(x=='ok'){
          this.subirImagen();
          this.toast.success('Se registro correctamente.','¡AVISO!');
          this.closeModal();
          this.limpiarTexto();
          this.listarJobs();
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

  listarJobs(){
    this.objJobs.opcion=5;
    this.fapi.fapiGetParameter("listarJobs",this.objJobs.opcion+'/'+this.objJobs.estado).subscribe(x=>{
      this.arrayJobs=x[0];
      for (let i = 0; i < this.arrayJobs.length; i++) {
        this.arrayJobs[i].foto=RutaImg+this.arrayJobs[i].foto;
      }
    })
  }
  openModalEliminacion(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=x.descripcion;
    this.objJobs.idtrabajos=x.idtrabajos;
  }
  openModalActivar(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=x.descripcion;
    this.objJobs.idtrabajos=x.idtrabajos;
  }
  eliminarJobs(){
    this.objJobs.opcion=3;
    this.fapi.fapiPut('removeJobs',this.objJobs).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se elimino correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarJobs();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }

  activarJobs(){
    this.objJobs.opcion=4;
    this.fapi.fapiPut('activateJobs',this.objJobs).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se activo correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarJobs();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
  actualizarJobs(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.objJobs.idtrabajos=x.idtrabajos;
    this.objJobs.titulo=x.titulo;
    this.objJobs.descripcion=x.descripcion;
    this.objJobs.foto=x.foto;
    this.obtenerFotoServer();
    this.verBotonRegistrar=false;
    this.verBotonActualizar=true;
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
  updateJobs(){
    this.objJobs.opcion=2;
    if(this.files.length>0){
      this.objJobs.foto=this.files[0].name;
      this.fapi.fapiPut('updateJobs',this.objJobs).subscribe(response=>{
        if(response='ok'){
          this.toast.success('Se actualizo correctamente.','¡AVISO!');
          this.modalService.hide();
          this.limpiarTexto();
          this.subirImagen();
          this.listarJobs();
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
  limpiarTexto(){
    this.objJobs.idtrabajos=0;
    this.objJobs.descripcion='';
    this.objJobs.estado=0;
    this.objJobs.foto='';
    this.objJobs.titulo='';
    this.objJobs.opcion=0;
  }
}
