import { RouterModule, Routes } from '@angular/router';
import {NgModule} from "@angular/core";


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes:Routes = [
    {
      path: 'dashboard', 
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [         
        {path:'', component: DashboardComponent, data: {titulo:'Dashboard'}},
        {path:'progress', component: ProgressComponent, data: {titulo:'progress'}},
        {path:'grafica1', component: Grafica1Component, data: {titulo:'grafica1'}},
        {path:'account-settings', component: AccountSettingsComponent,  data: {titulo:'Ajuste de cuenta'}},
        {path:'promesa', component: PromesaComponent, data: {titulo:'promesa'}},
        {path: 'rxjs', component: RxjsComponent,  data: {titulo:'rxjs'}},
        {path: 'perfil', component: PerfilComponent,  data: {titulo:'Perfil de usuario'}},

        // mantenimientos
        {path: 'usuarios', component: UsuariosComponent, data: {titulo:"usuarios de aplicación"} }
      ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class PagesRoutingModule {}