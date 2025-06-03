import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonFab, IonFabButton, IonLabel, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.page.html',
  styleUrls: ['./tabmenu.page.scss'],
  standalone: true,
  imports: [IonContent, IonFab, IonFabButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTab, IonTabBar, IonTabs, IonTabButton, IonIcon, IonLabel]
})
export class TabmenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
