import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public formSubmitted:boolean = false;
  public registerForm = this.fb.group({
    nombre:['Jorge Test 100',[Validators.required, Validators.minLength(3)]],
    email: ['test2022@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    passwordConfrm: ['12345', Validators.required],
    terminos:[true, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'passwordConfrm')
  });

  constructor(
    private usuarioServece: UsuarioService,
    private fb: FormBuilder
  ) {
    
  }
  passwordsIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup)=>{

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
          pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noesIgual:true})

      }
    }
  }
  createUser(){
    
    this.formSubmitted = true;
    console.log(this.registerForm);

    if(this.registerForm.invalid){
      return;
    }
    this.usuarioServece.crearUsuario(this.registerForm.value).subscribe( 
      (res) => {
        console.log('usuario creado');
        console.log(res);
        
      },(err) => {
        Swal.fire('Error', err.error.msg, 'error')
        // console.log(err.error.msg);
        
      } 
    )

  }
  validarPasswords(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('passwordConfrm')?.value;
    
    
    if( (pass1 !== pass2) && this.formSubmitted ){    
      return true;
    }else{
      return false;
    }
    
  }
  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
  
}
