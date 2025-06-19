import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-credencial-cadastrar',
  templateUrl: './credencial-cadastrar.page.html',
  styleUrls: ['./credencial-cadastrar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CredencialCadastrarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
