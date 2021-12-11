import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
// npm install chart.js@2.9.3 --save
// npm install ng2-charts@2.2.3 --save
@NgModule({
  declarations: [
    ProgressComponent,
    NopagefoundComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesaComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,

  ],
  exports: [
    ProgressComponent,
    NopagefoundComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
    
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    SharedModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    
  ],

})
export class PagesModule { }
