import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public interlSubs: Subscription;
  constructor() { 
   
    // this.retornaObserbable().pipe(
    //   retry(1) //repite la llamada de datos, (1) valor de veces que lo puede volver hacer
    // ).subscribe(
    //   data => console.log('subs', data), //regresa el datos 
    //   error => console.log('error', error), //error en caso de que hay alguno
    //   () => console.info('terminado') //completado
    // );

    this.interlSubs = this.retornaIntervalo().subscribe(
      (valor) => console.log(valor)
    )

  }
  ngOnDestroy(): void {
    this.interlSubs.unsubscribe();
  }
  retornaIntervalo():Observable<number>{
    return interval(1000) //el tiempo en dar cada ciclo
            .pipe( 
              take(10), //las veses que quiera dar el ciclo
              filter( valor => (valor % 2 === 0) ? true : false ), //si se quiere emitir un valor o no de manera condicional
              map( valor => valor+1) // el valor que yo quiero que salga al final
            ); 
     
  }
  retornaObserbable(): Observable<number>{
    let i = -1;
    return new Observable<number>( observer =>{

      const intervalo =setInterval( () =>{
        i++;
        observer.next(i);
        if(i == 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i == 2){
          
          observer.error('i llego al valor de 2');
        }
      },1000);
    });

   
  }

}
