import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuario:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTem:Usuario[] = [];
  public desde:number = 0;
  public countItenPage = 5;
  public cargando:boolean=true;
  public imgSubs!:Subscription;

  constructor(
    private usuarioService:UsuarioService,
    private busquedaService:BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.flagNuevaImg.pipe(delay(100)).subscribe(
      img => {
        console.log(img);
        
        this.cargarUsuarios()
      }
    );
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe( 
      ({total, usuarios}) =>{
        this.cargando = false;
        this.totalUsuario = total;

        if(usuarios.length !== 0){
          this.usuarios = usuarios;
          this.usuariosTem = usuarios;
        }
        console.log(this.usuarios);
        
      },
      (error) =>{
        console.log(error);        
      }
    );
  }

  cambiarPagina(valor:number){
    
    this.desde += valor;    
    

    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalUsuario){

      this.desde -=  valor;
    }
    this.cargarUsuarios();
  }
  buscar(termino:string){
   
    if(termino.length === 0){
      
       this.usuarios = this.usuariosTem;
       return;
    }
    this.busquedaService.buscar('usuarios',termino).subscribe(
      (resp:any) =>{
        this.usuarios = resp;

        console.log(resp);
        
      }
    )
  }
  eliminarUsuario(usuario:Usuario){

    if(usuario.usuario_id === this.usuarioService.userID){
      Swal.fire('Error', 'no puede borrarse a si mismo', 'error');
      return;
    }
    

    Swal.fire({
      title: 'Borrar usuario?',
      text: `esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp=>{
            Swal.fire('Usiario borrado', `${usuario.nombre}`, 'success');
            this.cargarUsuarios();
          },
          error =>{
            Swal.fire('Error al borrar', `${usuario.nombre}`, 'error');
          }
        );
      }
    })
  }
  cambiarRole(usuario:Usuario){
    console.log(usuario);
    Swal.showLoading();
    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp => {
        Swal.close();
        console.log(resp);
      },
      error =>{
        Swal.fire('Error','Error al cambiar de Role','error');

      }
    )
  }
  abrirModal(usuario:Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal("usuarios", `${usuario.usuario_id}`, usuario.img);
  }
}
