import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { CabecalhoComponent } from 'src/app/component/cabecalho/cabecalho.component';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
  standalone: true,
  imports: [CabecalhoComponent, IonItem, IonContent, IonHeader, IonButtons, IonButton, IonSearchbar, IonIcon, IonRow, IonCol, IonLabel, IonBackButton, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VaultPage implements OnInit {

  public senhaModelList = [
    {
      icon: 'logo-dribbble',
      color: '#EA4C89',
      title: 'Dribbble',
      email: 'josequintino@hotmail.com.br',
      lastUsed: '11 Minutes'
    },
    {
      icon: 'logo-facebook',
      color: '#1877F2',
      title: 'Facebook',
      email: 'quintino.fb@example.com',
      lastUsed: '2 Hours'
    },
    {
      icon: 'logo-instagram',
      color: '#E1306C',
      title: 'Instagram',
      email: 'quintino.insta@example.com',
      lastUsed: 'Yesterday'
    }
  ];

  constructor() {
    addIcons(icons);
  }

  ngOnInit() {
  }

}
