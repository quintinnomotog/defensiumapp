import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonGrid, IonContent, IonText, IonHeader, IonIcon, IonItem, IonLabel, IonRow, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, cloudOutline, earthOutline, gridOutline, laptopOutline, logoDribbble, menuOutline, scanOutline, searchOutline, walletOutline } from 'ionicons/icons';
import { CabecalhoComponent } from 'src/app/component/cabecalho/cabecalho.component';
import { CategoriaComponent } from 'src/app/component/categoria/categoria.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonGrid, IonText,
    IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonRow, IonCol, CabecalhoComponent, CategoriaComponent
  ]
})
export class PrincipalPage implements OnInit {

  public categoriaModelList = [
  { icon: 'earth-outline', title: 'Browser', count: 55 },
  { icon: 'cloud-outline', title: 'Cloud', count: 12 },
  { icon: 'laptop-outline', title: 'Application', count: 305 },
  { icon: 'wallet-outline', title: 'Payment', count: 1 }
];

  constructor() {
    addIcons({gridOutline,searchOutline,scanOutline,earthOutline,chevronForwardOutline,cloudOutline,laptopOutline,walletOutline,logoDribbble,menuOutline});
  }

  ngOnInit() { }

}
