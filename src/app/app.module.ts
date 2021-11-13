import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
// import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ComponentsModule,
    ChartsModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
