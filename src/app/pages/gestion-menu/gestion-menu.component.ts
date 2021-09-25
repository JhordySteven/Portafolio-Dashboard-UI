import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {FapiRestService} from '../../Service/fapi-rest.service';

@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.css']
})
export class GestionMenuComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fapi:FapiRestService,private tost:ToastrService) {}

  ngOnInit(): void {
    this.listarEstado();
    this.listarMenu();
    this.listarItemMaestro();
  }

  objEstado:any;
  objPagina:any;
  titleModal='';
  nombreDato='';
  verBotonRegistrar=false;
  verBotonActualizar=false;
  verBotonPreview=false;
  verTabla=true;
  verPreview=false;
  objMenuPagina={
    opcion:0,
    id:0,
    nombre:'',
    tipoMenu:0,
    ruta:'',
    estado:0
  }
  itemMaestro:any;
  mntMaestro={
    opcion:0,
    idMaestro:0
  }
  listarEstado(){
    let opcion=2;
    let idMaestro=2;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objEstado=x[0];
    })
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.titleModal="::Registrar Pagina Menu::";
    this.verBotonRegistrar=true;
    this.verBotonActualizar=false;
  }
  openActualizarModal(x,template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.titleModal="::Actualizar Pagina Menu::";
    this.verBotonRegistrar=false;
    this.verBotonActualizar=true;
    this.objMenuPagina.tipoMenu=x.TipoMenu;
    this.objMenuPagina.id=x.idmenu;
    this.objMenuPagina.nombre=x.nombre;
    this.objMenuPagina.ruta=x.ruta;
    this.objMenuPagina.estado=x.estado;
  }
  openModalEliminacion(x,template: TemplateRef<any>){
    this.modalRef=this.modalService.show(template);
    this.nombreDato=x.nombre;
    this.objMenuPagina.id=x.idmenu;
  }
  openModalActivar(x,template: TemplateRef<any>){
    this.modalRef=this.modalService.show(template);
    this.nombreDato=x.nombre;
    this.objMenuPagina.id=x.idmenu;
  }
  activarMenu(){
    this.objMenuPagina.opcion=4;
    this.fapi.fapiPut('activateMenu',this.objMenuPagina).subscribe(response=>{
      if(response=='ok'){
        this.tost.success('Se activo correctamente.','¡AVISO!');
        this.listarMenu();
        this.limpiarCaja();
        this.modalService.hide();
      }else{
        this.tost.warning('Ocurrio un error.','¡AVISO!');
      }
    })
  }
  closeModal(){
    this.modalService.hide();
    this.limpiarCaja();
  }
    //Listado Item Maesto
  listarItemMaestro(){
     this.mntMaestro.opcion=2;
     this.mntMaestro.idMaestro=1;
     this.fapi.fapiGetParameter('listMaestro',this.mntMaestro.opcion+'/'+this.mntMaestro.idMaestro).subscribe(x=>{
     this.itemMaestro=x[0];
    });
  }

  registrarMenu(){
    this.objMenuPagina.opcion=1;
    this.fapi.fapiPost('addMenu',this.objMenuPagina).subscribe(response=>{
      if(response=='ok'){
        this.tost.success('Se registro correctamente.','¡AVISO!');
        this.limpiarCaja();
        this.listarMenu();
        this.modalService.hide();
      }else{
        this.tost.warning('Ocurrio un error.','¡AVISO!');
      }
    })
  }

  listarMenu(){
    this.objMenuPagina.opcion=5;
    this.fapi.fapiGetParameter('listarMenu',this.objMenuPagina.opcion+'/'+this.objMenuPagina.estado).subscribe(response=>{
        this.objPagina=response[0];
    })    
  }
  limpiarCaja(){
    this.objMenuPagina.id=0;
    this.objMenuPagina.nombre='';
    this.objMenuPagina.tipoMenu=0;
    this.objMenuPagina.ruta='';
    this.objMenuPagina.estado=0;
  }
  actualizarPaginaMenu(){
    this.objMenuPagina.opcion=2;
    this.fapi.fapiPut('updateMenu',this.objMenuPagina).subscribe(response=>{
      if(response=='ok'){
        this.listarMenu();
        this,this.limpiarCaja();
        this.tost.success('Se actualizo correctamente.','¡AVISO!');
        this.modalService.hide();
      }else{
        this.tost.warning('Ocurrio un error.','¡AVISO!');
      }
    })
  }
  eliminarPaginaMenu(){
    this.objMenuPagina.opcion=3;
    this.fapi.fapiPut('removeMenu',this.objMenuPagina).subscribe(response=>{
      if(response=='ok'){
        this.tost.success('Se elimino correctamente.','¡AVISO!');
        this.modalService.hide();
        this.listarMenu();
      }else{
        this.tost.warning('Ocurrio un error.','¡AVISO!');
      }
    })
  }
}
