import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, cloudOutline, earthOutline, gridOutline, laptopOutline, logoDribbble, menuOutline, scanOutline, searchOutline, walletOutline } from 'ionicons/icons';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  standalone: true,
  imports: [ IonGrid, IonRow, IonCol, IonIcon, IonText, CommonModule ]
})
export class CategoriaComponent  implements OnInit {

  @Input() 
  public categoriaModelList: any[] = [];

  constructor() {
    addIcons({gridOutline,searchOutline,scanOutline,earthOutline,chevronForwardOutline,cloudOutline,laptopOutline,walletOutline,logoDribbble,menuOutline});
  }

  ngOnInit() {}

}
