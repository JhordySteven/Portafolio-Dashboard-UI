import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { SkillComponent } from './skill/skill.component';
import { WorkComponent } from './work/work.component';
import { JobsComponent } from './jobs/jobs.component';
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FormsModule }   from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgxTypedJsModule} from 'ngx-typed-js';


@NgModule({
  declarations: [NavbarComponent, PrincipalComponent, AboutComponent, SkillComponent, WorkComponent, JobsComponent, NavLateralComponent, FooterComponent, ContactoComponent],
  imports: [
    FormsModule,
    CommonModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    NgxFontAwesomeModule,
    NgxTypedJsModule
  ],exports:[
    NavbarComponent, PrincipalComponent, AboutComponent, SkillComponent, WorkComponent, JobsComponent,NavLateralComponent,FooterComponent,ContactoComponent
  ]
})
export class ComponentModule { }
