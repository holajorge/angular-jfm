import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// interfaces
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({providedIn: 'root'})

export class UsuarioService {
  public auth2:any;
  public usuario?:Usuario;
  
  constructor(
    private http: HttpClient, 
    private router:Router,
    private ngZone:NgZone
  ){
    this.googleInit();
  }
  get token():string{
    return  localStorage.getItem('token') || '';
  }
  get userID():string{
    return this.usuario?.user_id || '';
  }
  googleInit(){
    return new Promise<void>( resolve => {
      
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '519549766582-8mvki67372ahaq14e08i9c8vmqq5ejrr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        })
        resolve();
      });
    })   
  }

  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( ()=> {
      console.log('User signed out.');
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })      
    });

  }
  validarToken():Observable<boolean>{

    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','x-token': token });
    return this.http.get(`${base_url}/login/renew`, {headers})
      .pipe(
        
        map( (resp:any) => {
          
          const {nombre, email, role, img = '' ,google, usuario_id} = resp.user;            
          this.usuario = new Usuario(nombre, email, '', img, role, google,usuario_id);
                    
          localStorage.setItem('token', resp.token);
          
          return true;
        }),
       
        catchError( error => {
          console.log(error);          
          return of(false)
        })
      );

  }
  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  actualizarPerfil(data: {email:string, nombre:string, role:string}){

    data ={
      ...data,
      role: this.usuario?.role || ''
    }
    console.log(this.usuario);
    let url = `${base_url}/usuarios/${this.userID}`;
    console.log(url);
    
    return this.http.put(url, data, {headers: {'x-token': this.token}});

  }
  login(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  loginGoogle(token:any){
    
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  
}

