import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input('titulo') titulo:string = 'Sin tutulo';
  @Input('labels') doughnutChartLabels:Label[] = ['label2', 'label2', 'label3'];
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100]];
  @Input('colorsg1') colors:Color[] = [
    {backgroundColor: ['#9E120E', '#FF5800', '#FFB414']}
  ];

  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  // public colors:Color[] = [
  //   {backgroundColor: ['#9E120E', '#FF5800', '#FFB414']}
  // ];
  
}

