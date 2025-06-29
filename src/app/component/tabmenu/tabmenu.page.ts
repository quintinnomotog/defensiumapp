import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addCircle, appsOutline, hammerOutline } from 'ionicons/icons';
import { CredencialCadastrarPage } from 'src/app/modal/credencial-cadastrar/credencial-cadastrar.page';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.page.html',
  styleUrls: ['./tabmenu.page.scss'],
  standalone: true,
  imports: [IonModal, IonFab, IonFabButton, IonIcon, IonTabs, IonTabBar, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TabmenuPage implements OnInit {

  private modalController = inject(ModalController);

  constructor() {
    addIcons({ appsOutline, add, hammerOutline, addCircle });
  }

  ngOnInit() { }

  public async redirecionarModalCredencialCadastrar() {
    const modalCredencialCadastro = await this.modalController.create({
      component: CredencialCadastrarPage,
      initialBreakpoint: 100,
      breakpoints: [0.25, 0.50, 100]
    });
    await modalCredencialCadastro.present();
    const { role } = await modalCredencialCadastro.onWillDismiss();
  }

}
