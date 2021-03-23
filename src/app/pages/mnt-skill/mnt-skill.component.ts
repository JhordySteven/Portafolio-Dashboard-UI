import { Component, OnInit,TemplateRef } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mnt-skill',
  templateUrl: './mnt-skill.component.html',
  styleUrls: ['./mnt-skill.component.css']
})
export class MntSkillComponent implements OnInit {
  
  modalRef: BsModalRef;
  constructor(private fapi:FapiRestService,private modalService: BsModalService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.listarSkill();
    this.listarTipoSkill();
    this.listarEstado();
  }
  objEstado:any;
  objTipoSkill:any;
  verTabla:boolean=true;
  verPreview:boolean=false;
  verBotonPreview:boolean=false;

  mntSkill={
    idSkill:0,
    nombre:'',
    tipoSkill:0,
    imgSkill:'',
    colorImg:'',
    estado:0,
    opcion:0
  }
  tittleModal:string='';
  verBotonRegistrar:boolean=false;
  verBotonActualizar:boolean=false;
  nombreDato:string='';
  listarEstado(){
    let opcion=2;
    let idMaestro=2;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objEstado=x[0];
    })
  }
  listarTipoSkill(){
    let opcion=2;
    let idMaestro=3;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objTipoSkill=x[0];
    })
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.tittleModal="::Registrar Skill::";
    this.verBotonRegistrar=true;
    this.verBotonActualizar=false;
  }
  openModalEliminacion(item,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=item.nombre;
    this.mntSkill.idSkill=item.idskill;
  }
  openModalActivar(item,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.nombreDato=item.nombre;
    this.mntSkill.idSkill=item.idskill;
  }
  registrarSkill(){
    this.mntSkill.opcion=1;
    this.fapi.fapiPost('addSkill',this.mntSkill).subscribe(x=>{
      if(x=='ok'){
        this.toast.success('Se registro correctamente.','¡AVISO!');
        this.closeModal();
        this.listarSkill();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
  objSkill:any;
  listarSkill(){
    this.mntSkill.opcion=5;
    this.fapi.fapiGetParameter('listarSkill',this.mntSkill.opcion+'/'+this.mntSkill.estado).subscribe(x=>{
      this.objSkill=x[0];
    })
  }
  actualizarSkill(item,template: TemplateRef<any>) {
      this.tittleModal="::Actualizar Skill::";
      this.verBotonRegistrar=false;
      this.verBotonActualizar=true;
      this.mntSkill.idSkill=item.idskill;
      this.mntSkill.nombre=item.nombre;
      this.mntSkill.tipoSkill=item.idTipoSkill;
      this.mntSkill.imgSkill=item.imgSkill;
      this.mntSkill.colorImg=item.colorImg;
      this.mntSkill.estado=item.estado;
    this.modalRef = this.modalService.show(template);
  }
  updateSkill(){
    this.mntSkill.opcion=2;
    this.fapi.fapiPut('updateSkill',this.mntSkill).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se registro correctamente.','¡AVISO!');
        this.closeModal();
        this.listarSkill();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }
 //cerrar venatana
 closeModal(): void {
  this.modalService.hide();
  this.limpiarInput();
  }
  limpiarInput(){
      this.mntSkill.idSkill=0;
      this.mntSkill.nombre='';
      this.mntSkill.tipoSkill=0;
      this.mntSkill.imgSkill='';
      this.mntSkill.colorImg='';
      this.mntSkill.estado=0;
      this.mntSkill.opcion=0;
  }
  eliminarSkill(){
    this.mntSkill.opcion=3;
    this.fapi.fapiPut('removeSkill',this.mntSkill).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se elimino correctamente.','¡AVISO!');
        this.closeModal();
        this.listarSkill();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
  }

  activarSkill(){
    this.mntSkill.opcion=4;
    this.fapi.fapiPut('activateSkill',this.mntSkill).subscribe(x=>{
      if(x='ok'){
        this.toast.success('Se activo correctamente.','¡AVISO!');
        this.closeModal();
        this.listarSkill();
      }else{
        this.toast.warning('Algo no salio bien.','¡AVISO!');
      }
    })
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
