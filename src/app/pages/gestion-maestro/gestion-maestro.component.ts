import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FapiRestService} from '../../Service/fapi-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-maestro',
  templateUrl: './gestion-maestro.component.html',
  styleUrls: ['./gestion-maestro.component.css']
})
export class GestionMaestroComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fapi:FapiRestService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarTablaMaestroSelect();
  }
  tablaMaestro:any;
  itemMaestro:any;
  tittleItem="";
  tittleTabla="";
  verificarBotonTabla=false;
  botonTablaMaestro=false;
  botonItemMaestro=false;
  verRegistrar=false;
  nombreDato='';
  selTabla={
    idMaestro:0,
  }
  mntMaestro={
    idMaestro:0,
    nombreMaestro:'',
    desMaestro:'',
    maestroItem:'',
    estado:0,
    opcion:0
  }

  //Listado de Tabla Select
  listarTablaMaestroSelect(){
    this.mntMaestro.opcion=1;
    this.fapi.fapiGetParameter('listMaestro',this.mntMaestro.opcion+'/'+this.mntMaestro.idMaestro).subscribe(x=>{
      this.tablaMaestro=x[0];
    });
  }

  //listado Tabla 
  listarTablaMaestro(){
    this.mntMaestro.opcion=1;
    this.fapi.fapiGetParameter('listMaestro',this.mntMaestro.opcion+'/'+this.mntMaestro.idMaestro).subscribe(x=>{
      this.itemMaestro=x[0];
      console.log(this.itemMaestro);
      this.tittleTabla=":: Editar Tabla ::";
      this.verificarBotonTabla=true;
    });
  }

  //Listado Item Maesto
  listarItemMaestro(){
    this.mntMaestro.idMaestro=this.selTabla.idMaestro;
    if(this.mntMaestro.idMaestro==0){
      console.log("seleccionar corectamente");
      this.itemMaestro=[];
      this.listarTablaMaestro();
      return;
    }else{
      this.mntMaestro.opcion=2;
      this.fapi.fapiGetParameter('listMaestro',this.mntMaestro.opcion+'/'+this.mntMaestro.idMaestro).subscribe(x=>{
        this.itemMaestro=x[0];
        console.log(this.itemMaestro);
        if(this.itemMaestro.length>0){
          this.verificarBotonTabla=false;
        }
      });
    }
  }

  //Seleccion de Tabla o item
  selecTabla(){
    console.log(this.mntMaestro.idMaestro);
    if(this.selTabla.idMaestro!=0){
      this.verRegistrar=true;
    }else{
      this.verRegistrar=false;
    }
  }

  //abir modal Registrar
  modalRegistrar(template: TemplateRef<any>) {
    debugger
    this.modalRef = this.modalService.show(template); 
    if(this.selTabla.idMaestro==0){
      this.tittleTabla=":: Registrar Tabla ::";
      this.botonTablaMaestro=true;
    }else{
      this.tittleItem=":: Registrar Item ::";
      this.botonItemMaestro=true;
    }
  }
  //Registrar Tabla
  registrarTablaMaestro(){
    this.mntMaestro.opcion=3;
    this.fapi.fapiPost('addMaestro',this.mntMaestro).subscribe(x=>{
      if(x=='ok'){
        console.log("ok");
        this.modalService.hide();
        this.listarTablaMaestro();
        this.limpiarInput();
        this.listarTablaMaestroSelect();
      }else{
        console.log("algo no salio bien")
      }
    });
  }

  //Registrar Item
  registrarItemMaestro(){
    this.mntMaestro.idMaestro=this.selTabla.idMaestro;
    this.mntMaestro.opcion=4;
    this.fapi.fapiPost('addMaestro',this.mntMaestro).subscribe(x=>{
      if(x=='ok'){
        this.toastr.success('AVISO','Se registro el item correctamente.');
        this.modalService.hide();
        this.limpiarInput();
        this.listarItemMaestro();
      }else{
        this.toastr.warning('AVISO','Algo no salio bien.');
      }
    });
  }
  //cerrar venatana
  closeModal(): void {
    this.modalService.hide();
    this.limpiarInput();
  }

  //limpiar input
  limpiarInput(){
    this.mntMaestro.nombreMaestro='';
    this.mntMaestro.desMaestro='';
    this.mntMaestro.maestroItem='';
    this.mntMaestro.estado=0;
    this.mntMaestro.opcion=0;
  }
  //abrir modal actualizacion
  actualizarItemModal(item,template: TemplateRef<any>) {
    if(this.selTabla.idMaestro==0){
      this.tittleTabla=":: Editar Tabla ::";
      this.botonTablaMaestro=false;
    }else{
      this.tittleItem=":: Editar Item ::";
      this.botonItemMaestro=false;
    }
    this.mntMaestro.idMaestro=item.idMaestro;
    this.mntMaestro.nombreMaestro=item.nombreMaestro;
    this.mntMaestro.desMaestro=item.desMaestro;
    this.mntMaestro.maestroItem=item.maestroItem;
    this.modalRef = this.modalService.show(template);
  }
  //actualizar Item
  actualizarItem(){
    this.mntMaestro.idMaestro=this.selTabla.idMaestro;
    this.mntMaestro.opcion=6;
    this.fapi.fapiPut('updateMaestro',this.mntMaestro).subscribe(x=>{
      if(x=='ok'){
        console.log("bien");
        this.modalService.hide();
        this.listarItemMaestro();
        this.limpiarInput();
      }else{
        console.log("mal");
        this.modalService.hide();
      }
    })
  }

  //open modal eliminacion
  openModalEliminacion(item,template: TemplateRef<any>){
    this.nombreDato=item.nombreMaestro;
    this.mntMaestro.idMaestro=item.idMaestro;
    this.mntMaestro.maestroItem=item.maestroItem;
    this.modalRef = this.modalService.show(template);
  }
  //open modal activar
  openModalActivar(item,template: TemplateRef<any>){
    this.nombreDato=item.nombreMaestro;
    this.mntMaestro.idMaestro=item.idMaestro;
    this.mntMaestro.maestroItem=item.maestroItem;
    this.modalRef = this.modalService.show(template);
  }

  actualizarTablaMaestro(){
    this.mntMaestro.opcion=5;
    this.fapi.fapiPut('updateMaestro',this.mntMaestro).subscribe(x=>{
      if(x=='ok'){
        console.log("bien");
        this.modalService.hide();
        this.listarTablaMaestro();
        this.limpiarInput();
      }else{
        console.log("mal");
        this.modalService.hide();
      }
    })
  }

  eliminarMaestro(){
    this.mntMaestro.opcion=7;
    this.fapi.fapiPut('removeMaestro',this.mntMaestro).subscribe(x=>{
      if(x=='ok'){
        this.toastr.success('¡AVISO!','Se elimino correctamente.');
        this.modalService.hide();
        this.listarTablaMaestro();
        this.listarItemMaestro();
      }else{
        this.toastr.warning('¡AVISO!','Algo no salio bien.');
      }
    })
  }

  activarMaestro(){
    this.mntMaestro.opcion=8;
    this.fapi.fapiPut('activateMaestro',this.mntMaestro).subscribe(x=>{
      if(x=='ok'){
        this.toastr.success('¡AVISO!','Se activo correctamente.');
        this.modalService.hide();
        this.listarTablaMaestro();
        this.listarItemMaestro();
      }else{
        this.toastr.warning('¡AVISO!','Algo no salio bien.');
      }
    })
  }
}
  