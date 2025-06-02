import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonHeader, IonIcon, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gridOutline, menuOutline, searchOutline, scanOutline, earthOutline, chevronForwardOutline, cloudOutline, laptopOutline, walletOutline, logoDribbble } from 'ionicons/icons';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonRow, IonCol, IonGrid, 
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle
  ]
})
export class PrincipalPage implements OnInit {

  constructor() {
    addIcons({gridOutline,searchOutline,scanOutline,earthOutline,chevronForwardOutline,cloudOutline,laptopOutline,walletOutline,logoDribbble,menuOutline});
  }

  ngOnInit() { }

}
