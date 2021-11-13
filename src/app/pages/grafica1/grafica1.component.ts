import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  labels1:string[] = ['enero', 'Marzo', 'Diciembre'];
  data1:any[] = [[35, 750, 50]];
  colors1:Color[] = [
    {backgroundColor: ['#48A1B9', '#6F9525', '#B982C7']}
  ];
}
