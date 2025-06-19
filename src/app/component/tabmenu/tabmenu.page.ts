import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonFab, IonFabButton, IonIcon, IonContent, IonHeader, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { appsOutline, hammerOutline, addCircle, add } from 'ionicons/icons';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.page.html',
  styleUrls: ['./tabmenu.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonTabs, IonTabBar, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TabmenuPage implements OnInit {

  constructor() {
    addIcons({appsOutline,add,hammerOutline,addCircle});
  }

  ngOnInit() {
  }

}
