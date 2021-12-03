import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  imgUrl:any = '';
  public usuario?:Usuario;

  constructor(private usuarioService:UsuarioService) { 
    this.usuario = usuarioService.usuario;
    // console.log(this.usuario?.nombre);
    // console.log(this.usuario?.imgProfile);
  }

  logout(){
    this.usuarioService.logout();
  }


  

}
