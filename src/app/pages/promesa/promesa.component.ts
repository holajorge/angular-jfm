import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })
    // const promesa = new Promise( (resolve, reject)=>{
    //   if(false){
    //     resolve('hola mundo');
    //   }else{
    //     reject('algo salio mal al traer los datos');
    //   }
      
    // });

    // promesa.then( (mensaje)=>{
    //   console.log(mensaje);
    // }).catch( error => {
    //   console.log('Error en mi promesa', error);
    // })

    // console.log("hola mundo 222");
  }
  getUsuarios(){

    const promesa = new Promise( resolve => {
    
      fetch('https://reqres.in/api/users')
        .then( res => res.json())
        .then( body => resolve(body.data));

    });
    return promesa;
  }
  



}
