import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss'],
  imports: [ IonGrid, IonRow, IonCol, IonIcon, IonText, CommonModule, IonItem, IonLabel ]
})
export class SenhaComponent  implements OnInit {

  @Input() 
  public senhaModelList: any[] = [];

  constructor() {
    addIcons(icons);
  }

  ngOnInit() {}

}
