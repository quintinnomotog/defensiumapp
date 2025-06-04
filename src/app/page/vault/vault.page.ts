import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
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
      lastUsed: '11 Minutes',
      password: '#EA4C89'
    },
    {
      icon: 'logo-facebook',
      color: '#1877F2',
      title: 'Facebook',
      email: 'quintino.fb@example.com',
      lastUsed: '2 Hours',
      password: '#1877F2'
    },
    {
      icon: 'logo-instagram',
      color: '#E1306C',
      title: 'Instagram',
      email: 'quintino.insta@example.com',
      lastUsed: 'Yesterday',
      password: '#E1306C'
    }
  ];

  private toastController = inject(ToastController);

  constructor() {
    addIcons(icons);
  }

  ngOnInit() { }

  public async copiarSenhaClipboard(senha: any) {
    await navigator.clipboard.writeText(senha);
    this.showToast();
  }

  private async showToast() {
    const toast = await this.toastController.create({
      message: `Senha copiada com Sucesso!`,
      duration: 3000,
      position: 'bottom',
      color: 'secondary'
    });
    await toast.present();
  }

}
