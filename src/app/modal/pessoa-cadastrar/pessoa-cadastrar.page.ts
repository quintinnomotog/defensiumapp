import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { apps, globe } from 'ionicons/icons';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.page.html',
  styleUrls: ['./pessoa-cadastrar.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonLabel, IonModal, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PessoaCadastrarPage implements OnInit {

  constructor() {
    addIcons({apps, globe });
  }

  ngOnInit() { }

}
