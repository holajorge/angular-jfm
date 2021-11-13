import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

// modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
// npm install chart.js@2.9.3 --save
// npm install ng2-charts@2.2.3 --save
@NgModule({
  declarations: [
    ProgressComponent,
    NopagefoundComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,

  ],
  exports: [
    ProgressComponent,
    NopagefoundComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    AppRoutingModule,
    ComponentsModule,
    
  ],

})
export class PagesModule { }
