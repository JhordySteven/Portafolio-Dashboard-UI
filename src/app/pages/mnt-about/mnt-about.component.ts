import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';

@Component({
  selector: 'app-mnt-about',
  templateUrl: './mnt-about.component.html',
  styleUrls: ['./mnt-about.component.css']
})
export class MntAboutComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fapi:FapiRestService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.listarAbout();
  }
  verBotonPreview=false;
  verBotonRegistrar=false;
  verBotonActualizar=false;
  tittleModal="";
  arrayAbout:any;
  objAbout={
    idAbout:0,
    descripcion:'',
    foto:'',
    estado:0,
    opcion:0
  }

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

  registrarAbout(){
    this.objAbout.opcion=1;
    this.objAbout.foto=this.files[0].name;
    this.fapi.fapiPost("addAbout",this.objAbout).subscribe(x=>{
      if(x=='ok'){
        this.toast.success('Se registro correctamente.','¡AVISO!');
      }
    })
  }
  files: File[] = [];
  onSelect(event){
    if(this.files.length<1){
      this.files.push(...event.addedFiles);
      }
  }
  subirImagen(){
    debugger
    const formData=new FormData();
    formData.append('archivo',this.files[0]);
    this.fapi.fapiPost('subirFoto',formData) .subscribe(x=>{
    })
  }

  listarAbout(){
    this.objAbout.opcion=4;
    this.fapi.fapiGetParameter("listarAbout",this.objAbout.opcion).subscribe(x=>{
      this.arrayAbout=x[0];
      for (let i = 0; i < this.arrayAbout.length; i++) {
        this.arrayAbout[i].foto=RutaImg+this.arrayAbout[i].foto;
      }
    })
  }
  nombreDato:string="";
  openModalEliminacion(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=x.descripcion;
    this.objAbout.idAbout=x.idAbout;
  }
  openModalActivar(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=x.descripcion;
    this.objAbout.idAbout=x.idAbout;
  }
  eliminarAbout(){
    this.objAbout.opcion=3;
    this.fapi.fapiPut('removeAbout',this.objAbout).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se elimino correctamente.','¡AVISO!');
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }

  activarAbout(){
    this.objAbout.opcion=5;
    this.fapi.fapiPut('removeAbout',this.objAbout).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se activo correctamente.','¡AVISO!');
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
  actualizarAbout(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.objAbout.idAbout=x.idAbout;
    this.objAbout.descripcion=x.descripcion;
    this.objAbout.foto=x.foto;
    this.obtenerFotoServer();
  }
  obtenerFotoServer(){
    this.fapi.fapiGet("verFotos").subscribe(x=>{
      console.log(x);
    })
  }

}
