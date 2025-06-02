import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonRow, IonText, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, cloudOutline, earthOutline, gridOutline, laptopOutline, logoDribbble, menuOutline, scanOutline, searchOutline, walletOutline } from 'ionicons/icons';
import { CabecalhoComponent } from 'src/app/component/cabecalho/cabecalho.component';
import { CategoriaComponent } from 'src/app/component/categoria/categoria.component';
import { SenhaComponent } from 'src/app/component/senha/senha.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonGrid, IonText,
    IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonRow, IonCol, CabecalhoComponent, CategoriaComponent, SenhaComponent
  ]
})
export class PrincipalPage implements OnInit {

  public categoriaModelList = [
    { icon: 'earth-outline', title: 'Browser', count: 55 },
    { icon: 'cloud-outline', title: 'Cloud', count: 12 },
    { icon: 'laptop-outline', title: 'Application', count: 305 },
    { icon: 'wallet-outline', title: 'Payment', count: 1 }
  ];

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
    },
    {
      icon: 'logo-twitter',
      color: '#1DA1F2',
      title: 'Twitter',
      email: 'quintino.tw@example.com',
      lastUsed: '3 Days'
    },
    {
      icon: 'logo-github',
      color: '#1877F2',
      title: 'GitHub',
      email: 'quintino.gh@example.com',
      lastUsed: '1 Week'
    }
  ];

  constructor() {
    addIcons({ gridOutline, searchOutline, scanOutline, earthOutline, chevronForwardOutline, cloudOutline, laptopOutline, walletOutline, logoDribbble, menuOutline });
  }

  ngOnInit() { }

}
