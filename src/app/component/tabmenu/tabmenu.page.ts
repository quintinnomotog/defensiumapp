import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, IonContent, IonHeader, IonIcon, IonFab, IonFabButton, IonLabel, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SenhaCadastrarPage } from 'src/app/page/senha/senha-cadastrar/senha-cadastrar.page';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.page.html',
  styleUrls: ['./tabmenu.page.scss'],
  standalone: true,
  imports: [IonContent, IonFab, IonFabButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTab, IonTabBar, IonTabs, IonTabButton, IonIcon, IonLabel]
})
export class TabmenuPage implements OnInit {

  private modalController = inject(ModalController);

  constructor() { }

  ngOnInit() { }

  public async cadastrarSenha() {
    const createModalController = await this.modalController.create({
      component: SenhaCadastrarPage
    });
    return await createModalController.present();
  }

}
