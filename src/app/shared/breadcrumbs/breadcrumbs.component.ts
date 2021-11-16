import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Event, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo:string = "";
  public tituloSub: Subscription

  constructor(private router:Router) {

    this.tituloSub = this.getAtributosRuta().subscribe( ({titulo}) => {
      this.titulo = titulo;
      document.title = 'Admin Pro | '+titulo;
    });

  
   }
  ngOnDestroy(): void {
    this.tituloSub.unsubscribe();
  }

 

  getAtributosRuta(){
    return this.router.events
      .pipe(
        filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
        map( (event:ActivationEnd) => event.snapshot.data )
    )
  }

}
