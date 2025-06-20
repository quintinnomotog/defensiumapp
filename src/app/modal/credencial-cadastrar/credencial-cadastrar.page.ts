import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-credencial-cadastrar',
  templateUrl: './credencial-cadastrar.page.html',
  styleUrls: ['./credencial-cadastrar.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CredencialCadastrarPage implements OnInit {

  constructor() {
    addIcons({add,personOutline});
  }

  ngOnInit() {
  }

}
