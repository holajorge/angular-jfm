import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  
  public imagenSubir?:File;
  public imgTemp:any = "";

  constructor(
    public fileUploadService:FileUploadService,
    public modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
    
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo; 
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then( (img:any)  => {       
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        this.cerrarModal();
        this.modalImagenService.flagNuevaImg.emit(img);
      }).catch( (err) =>{
        console.log(err);
        Swal.fire('Error','no se puedo subir la imagen' , 'error');
      });
  }


}
