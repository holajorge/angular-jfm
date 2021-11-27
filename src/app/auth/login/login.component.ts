import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public auth2:any;
  public formSubmitted:boolean = false;
  public loginForm = this.fb.group({    
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    remember:false
  });

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone:NgZone
  ) { 
  }
  ngOnInit(){
    this.renderButton();
  }
  ingresar(proveedor: string){
    console.log(proveedor);
  }
  login(){
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value).subscribe(
      (res) => {
        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value);

        }else{
          localStorage.removeItem('email');
        } 
        console.log('usuario logeado');
        console.log(res);

        this.router.navigateByUrl('/');
        
      }, 
      (error) =>{
        Swal.fire('Error', error.error.msg, 'error')
      }
    )
  } 
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }
  async startApp(){

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;    
    this.attachSignin(document.getElementById('my-signin2'));
    

  };
  attachSignin(element:any) {
      
      this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
            var id_token = googleUser.getAuthResponse().id_token;
            
            this.usuarioService.loginGoogle(id_token).subscribe(
              res => {
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })      
                //TODO:Mover al home o dashboard
                // this.router.navigateByUrl('/')
              }
            );
        }, (error:any) =>{
            alert(JSON.stringify(error, undefined, 2));
        }
      );
    }


}
