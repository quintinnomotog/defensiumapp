import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonContent, IonHeader, IonSearchbar, IonText, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copy, copyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonText, IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PrincipalPage implements OnInit {

  private toastController = inject(ToastController);

  public credencialList = [
    { "code": 1, nome: "Google Account", imagem: "assets/icon/google.png", email: "jhon.doe@gmail.com", senha: "12345648" },
    { "code": 2, nome: "Netflix Personal", imagem: "assets/icon/netflix.png", email: "jhon.doe@gmail.com", senha: "12345648" },
    { "code": 3, nome: "Twitter", imagem: "assets/icon/x.png", email: "jhon.doe@gmail.com", senha: "12345648" },
    { "code": 4, nome: "Dribbble Pro", imagem: "assets/icon/dribbble.png", email: "jhon.doe@gmail.com", senha: "12345648" }
  ];

  constructor() {
    addIcons({
      copyOutline, copy
    });
  }

  ngOnInit() {
  }

  public async copiarSenha() {
    const toast = await this.toastController.create({
      message: "Senha copiada para a área de transferência!",
      duration: 1500,
      color: "primary",
      position: "bottom"
    });
    return toast.present();
  }

}
