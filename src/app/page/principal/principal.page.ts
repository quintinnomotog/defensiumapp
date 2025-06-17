import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonText, IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonText, IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrincipalPage implements OnInit {

  private toastController = inject(ToastController);

  constructor() { }

  ngOnInit() {
  }

  public async apresentarAlerta() {
    const toast = await this.toastController.create({
      message: "Processando Informações",
      duration: 1500,
      color: "danger",
      position: "middle"
    });
    return toast.present();
  }

}
