
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { RutaImg } from 'src/app/Service/General';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mnt-work',
  templateUrl: './mnt-work.component.html',
  styleUrls: ['./mnt-work.component.css']
})
export class MntWorkComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private fapi:FapiRestService,private modalService: BsModalService,private toast:ToastrService,private datePipe: DatePipe) { }

  ngOnInit(): void {
  }
  objEstado:any;
  ObjWork:any;
  tittleModal='';
  verBotonRegistrar=false;
  verBotonActualizar=false;
  verTabla:boolean=true;
  verPreview:boolean=false;
  verBotonPreview:boolean=false;
  objWorkCliente:any;
  nombreDato:string='';
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

  listarEstado(){
    let opcion=2;
    let idMaestro=2;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objEstado=x[0];
      console.log(this.objEstado);
    })
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.tittleModal="::Registrar Work::";
    this.verBotonRegistrar=true;
    this.verBotonActualizar=false;
  }
  actualizarModal(item,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.tittleModal="::Actualizar Work::";
    this.verBotonRegistrar=false;
    this.verBotonActualizar=true;
    /**/
    this.mntWork.idWork=item.idwork;
    this.mntWork.nombre=item.nombre;
    this.mntWork.estudio=item.estudio;
    this.mntWork.fechaInicio=this.datePipe.transform(item.fechaInicio,"yyyy-MM-dd");
    this.mntWork.fechaFin=this.datePipe.transform(item.fechaFin,"yyyy-MM-dd");
    this.mntWork.imagen=item.imagen;
    this.mntWork.estado=item.estado;
    console.log(this.mntWork);
  }
  files: File[] = [];
 
  onSelect(event) {
    debugger
    console.log(event);
    if(this.files.length<1){
    this.files.push(...event.addedFiles);
    console.log(this.files);
    console.log(this.files[0].name);
    }
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  subirImagen(){
    debugger
    const formData=new FormData();
    formData.append('archivo',this.files[0]);
    this.fapi.fapiPost('subirFoto',formData) .subscribe(x=>{
      
    })
  }

  registrar(){
    this.mntWork.opcion=1;
    this.mntWork.imagen=this.files[0].name;
    this.fapi.fapiPost('addWork',this.mntWork).subscribe(x=>{
      if(x=='ok'){
        this.toast.success('AVISO','Se registro correctamente.');
        this.subirImagen();
      }
    })
  }

  listarWork(){
    this.mntWork.opcion=2;
    this.mntWork.estado=1;
    this.fapi.fapiGetParameter('listWork',this.mntWork.opcion+'/'+this.mntWork.estado).subscribe(x=>{
        this.ObjWork=x[0];
        console.log(this.ObjWork);
        for (let i = 0; i < this.ObjWork.length; i++) {
          this.ObjWork[i].imagen=RutaImg+this.ObjWork[i].imagen;
        }
    })
  }

  listarWorkCliente(){
      this.mntWork.opcion=2;
      this.mntWork.estado=1;
      this.fapi.fapiGetParameter('listWork',this.mntWork.opcion+'/'+this.mntWork.estado).subscribe(x=>{
          this.objWorkCliente=x[0];
          console.log(this.objWorkCliente);
          for (let i = 0; i < this.objWorkCliente.length; i++) {
            this.objWorkCliente[i].imagen=RutaImg+this.objWorkCliente[i].imagen;
          }
      })
  }

  openPreview(){
    this.verPreview=true;
    this.verTabla=false;
    this.verBotonPreview=true;
    this.listarWorkCliente();
  }
  closePreview(){
    this.verPreview=false;
    this.verTabla=true;
    this.verBotonPreview=false;
  }
  //cerrar venatana
  closeModal(): void {
    this.modalService.hide();
  }
  //eliminar
  eliminarWork(){
    this.mntWork.opcion=3;
    this.fapi.fapiPut('deleteWork',this.mntWork).subscribe(x=>{
      if(x=='ok'){
        this.toast.success('Se elimino correctamente.','!AVISO¡');
        this.modalService.hide();
      }else{
        this.toast.error('!AVISO¡','Algo salio mal.');
      }
    })
  }
  //abrir modal eliminacion
  openModalEliminacion(item,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=item.nombre;
    this.mntWork.idWork=item.idwork;
  }
  //abri modal activar
  openModalActivar(item,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=item.nombre;
    this.mntWork.idWork=item.idwork;
  }
  activarWork(){
    this.mntWork.opcion=4;
    this.fapi.fapiPut('activateWork',this.mntWork).subscribe(x=>{
      if(x=='ok'){
        this.toast.success('Se activo correctamente.','!AVISO¡');
        this.modalService.hide();
      }else{
        this.toast.error('!AVISO¡','Algo salio mal.');
      }
    })
  }
}
