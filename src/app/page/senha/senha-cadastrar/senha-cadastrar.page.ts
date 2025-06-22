import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputTextComponent } from 'src/app/component/input-text/input-text.component';

@Component({
  selector: 'app-senha-cadastrar',
  templateUrl: './senha-cadastrar.page.html',
  styleUrls: ['./senha-cadastrar.page.scss'],
  standalone: true,
  imports: [InputTextComponent, IonSelect, IonSelectOption, IonInput, IonLabel, IonItem, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SenhaCadastrarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
