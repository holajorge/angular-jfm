import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  usuario:any = [];
  public imagenSubir?:File;
  perfilForm:FormGroup;
  // public imagenSubir?:File;
  public imgTemp:any = "";
  constructor(
    private fileUploadService: FileUploadService,
    private ref: ChangeDetectorRef,
    private fb:FormBuilder, private usuarioService: UsuarioService) { 
    this.usuario = this.usuarioService.usuario;

    this.perfilForm  = this.fb.group({
      nombre: [this.usuario?.nombre,Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]]
    });
    

  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.perfilForm.patchValue({
      nombre: this.usuario?.nombre,
      email: this.usuario?.email,
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm?.value);
    this.usuarioService.actualizarPerfil(this.perfilForm?.value)
      .subscribe( 
        (resp:any) => {
            const {nombre, email} = this.perfilForm.value;
            this.usuario!.nombre = nombre;
            this.usuario!.email = email;
            Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        },error =>{
          Swal.fire('Error', error.error.msg , 'error');
        }
      );

  }
  cambiarImagen(event:any){
    let file = event.target.files[0];
    this.imagenSubir = event.target.files[0];    

    if(!file){
      this.imgTemp = null;
      return;
    }
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = ()=>{      
      this.imgTemp = render.result;
    }

  }

  subirImagen(){
      this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario?.user_id || '')
        .then( (imgn:any)  => {       
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
          this.usuario.img = imgn;          
        }).catch( (err) =>{
          console.log(err);
          Swal.fire('Error','no se puedo subir la imagen' , 'error');
        });
  }

}
