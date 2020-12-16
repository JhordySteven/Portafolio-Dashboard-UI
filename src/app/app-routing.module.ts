import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillComponent } from './component/skill/skill.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GestionMaestroComponent } from './pages/gestion-maestro/gestion-maestro.component';
import { GestionMenuComponent } from './pages/gestion-menu/gestion-menu.component';
import { GestionUsuarioComponent } from './pages/gestion-usuario/gestion-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { MntSkillComponent } from './pages/mnt-skill/mnt-skill.component';
import { MntWorkComponent } from './pages/mnt-work/mnt-work.component';

const routes: Routes = [
  //{ path: '', component: ClienteComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  {path:'gestMaestro',component:GestionMaestroComponent},
  {path:'gestUsuario',component:GestionUsuarioComponent},
  {path:'gestMenu',component:GestionMenuComponent},
  {path:'gestSkill',component:MntSkillComponent},
  {path:'gestWork',component:MntWorkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
