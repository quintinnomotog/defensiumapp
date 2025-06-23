import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, ModalController, PopoverController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, keyOutline, lockClosedOutline, mailOutline, personOutline, reloadOutline } from 'ionicons/icons';
import { PessoaCadastrarPage } from '../pessoa-cadastrar/pessoa-cadastrar.page';

@Component({
  selector: 'app-credencial-cadastrar',
  templateUrl: './credencial-cadastrar.page.html',
  styleUrls: ['./credencial-cadastrar.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CredencialCadastrarPage implements OnInit {

  private modalController = inject(ModalController);

  private popoverController = inject(PopoverController);

  constructor() {
    addIcons({ add, personOutline, mailOutline, lockClosedOutline, reloadOutline, keyOutline });
  }

  ngOnInit() { }

  public gerarSenha() { }

  public async abrirModalPessoaCadastrar() {

    // await this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PessoaCadastrarPage,
      cssClass: "modal-secundaria",
      // backdropDismiss: false,
      // showBackdrop: true,
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    console.log('Secundária fechada com role:', role);

    if (role !== 'cancel') {
      // Reabre a primária
      // this.openPrimaryModal();
    }

  }

  public async abrirPopoverPessoaCadastrar() {
    const popover = await this.popoverController.create({
      component: PessoaCadastrarPage,
      cssClass: "popover"
    });
    return await popover.present();
  }

}
