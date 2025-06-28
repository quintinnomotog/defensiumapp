import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { apps, globe } from 'ionicons/icons';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.page.html',
  styleUrls: ['./pessoa-cadastrar.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonButton,
    IonIcon,
    IonLabel,
    CommonModule,
    FormsModule,
    IonCol,
  ],
})
export class PessoaCadastrarPage implements OnInit {
  public iconeList: string[] = [
    'add',
    'alarm',
    'albums',
    'alert',
    'analytics',
    'aperture',
    'apps',
    'archive',
    'arrow-back',
    'arrow-down',
    'arrow-forward',
    'arrow-up',
    'at',
    'attach',
    'backspace',
    'bag',
    'bar-chart',
    'barcode',
    'battery-charging',
    'battery-dead',
    'battery-full',
    'bed',
    'beer',
    'bicycle',
    'bluetooth',
    'boat',
    'body',
    'bonfire',
    'book',
    'bookmark',
    'briefcase',
    'brush',
    'bug',
    'build',
    'bus',
    'business',
    'cafe',
    'calculator',
    'calendar',
    'call',
    'camera',
    'car',
    'card',
    'cart',
    'cash',
    'chatbubble',
    'checkmark',
    'checkbox',
    'clipboard',
    'cloud',
    'code',
    'color-palette',
    'compass',
    'construct',
    'contrast',
    'copy',
    'create',
    'cube',
    'cut',
    'desktop',
    'document',
    'download',
    'ear',
    'earth',
    'eye',
    'fast-food',
    'female',
    'file-tray',
    'finger-print',
    'fitness',
    'flag',
    'flame',
    'flash',
    'flask',
    'folder',
    'football',
    'game-controller',
    'gift',
    'glasses',
    'globe',
    'grid',
    'hammer',
    'hand-left',
    'happy',
    'headset',
    'heart',
    'help',
    'home',
    'hourglass',
    'ice-cream',
    'image',
    'infinite',
    'information-circle',
    'journal',
    'key',
    'layers',
    'leaf',
    'link',
    'list',
    'lock-closed',
    'log-in',
    'magnet',
    'mail',
    'man',
    'map',
    'medal',
    'medical',
    'mic',
    'moon',
    'musical-notes',
    'navigate',
    'notifications',
    'paper-plane',
    'paperclip',
    'partly-sunny',
    'pause',
    'paw',
    'person',
    'phone-portrait',
    'pizza',
    'planet',
    'play',
    'power',
    'print',
    'pulse',
    'qr-code',
    'rainy',
    'reader',
    'refresh',
    'rocket',
    'rose',
    'save',
    'school',
    'search',
    'send',
    'server',
    'settings',
    'shield-checkmark',
    'shirt',
    'shuffle',
    'skull',
    'snow',
    'sparkles',
    'star',
    'stats-chart',
    'storefront',
    'sunny',
    'sync',
    'tablet-portrait',
    'thermometer',
    'thumbs-up',
    'time',
    'timer',
    'train',
    'trash',
    'trending-up',
    'trophy',
    'umbrella',
    'videocam',
    'wallet',
    'warning',
    'water',
    'wifi',
    'woman',
  ];

  public corList: string[] = [];

  public iconeSelecionado: string | null = null;

  public corSelecionada: string | null = null;

  constructor() {
    addIcons({ apps, globe });
  }

  ngOnInit() {
    this.gerarCoresAleatorias();
    console.log(this.corList);
  }

  public selecionarIcone(icone: string) {
    this.iconeSelecionado = icone;
    console.log(this.iconeSelecionado);
  }

  private getCor(): string {
    const r = Math.floor(Math.random() * 80) + 160;
    const g = Math.floor(Math.random() * 80) + 160;
    const b = Math.floor(Math.random() * 80) + 160;
    const cor = (value: number) => value.toString(16).padStart(2, '0');
    return `#${cor(r)}${cor(g)}${cor(b)}`;
  }

  public gerarCoresAleatorias() {
    for (let index = 0; index < 12; index++) {
      this.corList.push(this.getCor());
    }
  }

  public selecionarCor(cor: string) {
    this.corSelecionada = cor;
    console.log(this.corSelecionada);
    
  }

}
