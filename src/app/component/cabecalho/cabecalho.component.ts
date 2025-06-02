import { Component, input, OnInit } from '@angular/core';
import { IonRow, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
  imports: [
    IonRow, IonLabel
  ]
})
export class CabecalhoComponent  implements OnInit {

  public label = input<string>("");

  constructor() { }

  ngOnInit() {}

}
