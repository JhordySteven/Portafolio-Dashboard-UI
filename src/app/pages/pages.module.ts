import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentModule } from '../component/component.module';
import { GestionMenuComponent } from './gestion-menu/gestion-menu.component';
import { GestionMaestroComponent } from './gestion-maestro/gestion-maestro.component';
import { GestionSeguridadComponent } from './gestion-seguridad/gestion-seguridad.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MntSkillComponent } from './mnt-skill/mnt-skill.component';
import { MntWorkComponent } from './mnt-work/mnt-work.component';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [ClienteComponent, LoginComponent, DashboardComponent, GestionMenuComponent, GestionMaestroComponent, GestionSeguridadComponent, GestionUsuarioComponent, MntSkillComponent, MntWorkComponent],
  imports: [
    CommonModule,
    ComponentModule,
    ModalModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgxDropzoneModule
  ],exports:[
    ClienteComponent, LoginComponent, DashboardComponent
  ]
})
export class PagesModule { }
