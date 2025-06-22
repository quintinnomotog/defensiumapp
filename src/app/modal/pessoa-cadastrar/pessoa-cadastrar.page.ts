import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonLabel, IonModal, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { appsOutline, globeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.page.html',
  styleUrls: ['./pessoa-cadastrar.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonModal, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PessoaCadastrarPage implements OnInit {

  constructor() {
    addIcons({appsOutline,globeOutline});
  }

  ngOnInit() { }

}
