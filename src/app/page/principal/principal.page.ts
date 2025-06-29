import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  copy,
  copyOutline,
  logoGoogle,
  logoMicrosoft,
  logoWindows,
  notifications,
  notificationsOutline,
  reload,
  reloadOutline,
  business,
  card,
  wifi,
  server,
  earth,
  key,
  lockClosed,
  shieldCheckmark,
  colorPalette,
  barChart,
  pieChart,
  settings,
  terminal,
  cloud,
} from 'ionicons/icons';
import { CredencialService } from 'src/app/service/credencial.service';
import { CategoriaCredencialService } from '../../service/categoria-credencial.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    IonSearchbar,
    IonText,
    IonAvatar,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CredencialService],
})
export class PrincipalPage implements OnInit {
  private toastController = inject(ToastController);

  private credencialService = inject(CredencialService);

  public credencialList: any[] = [];

  public isAnimacaoAtivada: boolean = false;

  public categoriaCredencialList: any[] = [];

  private categoriaCredencialService = inject(CategoriaCredencialService);

  constructor() {
    addIcons({
      logoWindows,
      reload,
      notificationsOutline,
      logoMicrosoft,
      copyOutline,
      logoGoogle,
      notifications,
      reloadOutline,
      copy,
      business,
      card,
      wifi,
      server,
      earth,
      key,
      lockClosed,
      shieldCheckmark,
      colorPalette,
      barChart,
      pieChart,
      settings,
      terminal,
      cloud,
    });
  }

  ngOnInit() {
    this.findAll();
    this.recuperarCategoriaCredencial();
  }

  ionViewWillEnter() {}

  // FIXME: Deve fazer uma requisição passando o codePublic e retornar a senha verdadeira
  // não criptografada
  public async copiarSenha(credencial: any) {
    await navigator.clipboard.writeText(credencial.senha);
    this.emitirMensagemToast();
  }

  public findAll(): void {
    this.credencialService.findAll().subscribe({
      next: (response: any) => {
        this.credencialList = response.objectList;
      },
      error: (error) => {
        console.error('Erro ao buscar credenciais:', error);
      },
    });
    this.isAnimacaoAtivada = false;
  }

  public getRecuperarNome(item: any) {
    return item.descricao.charAt(0).toUpperCase();
  }

  public async emitirMensagemToast() {
    const toast = await this.toastController.create({
      message: 'Senha copiada para a área de transferência!',
      duration: 1500,
      color: 'primary',
      position: 'bottom',
    });
    return toast.present();
  }

  public atualizarDadosCredenciais() {
    this.isAnimacaoAtivada = true;
    setInterval(() => {
      this.findAll();
      this.isAnimacaoAtivada = false;
      return;
    }, 2000);
  }

  private recuperarCategoriaCredencial() {
    this.categoriaCredencialService.getFindAll().subscribe({
      next: (response) => {
        this.categoriaCredencialList = response.map(
          (categoriaCredencial: any) => {
            categoriaCredencial.icone = this.getIconeAleatorio();
            categoriaCredencial.corIcone = this.getCorPorCategoria();
            categoriaCredencial.background = this.getCorPorCategoria();
            return categoriaCredencial;
          }
        );
      },
      error: (response) => {
        console.error(
          'Erro ao tentar recuperar as Categorias das Credenciais!'
        );
      },
    });
  }

  private getCorPorCategoria(): string {
    const r = Math.floor(Math.random() * 80) + 150;
    const g = Math.floor(Math.random() * 80) + 150;
    const b = Math.floor(Math.random() * 80) + 150;
    const cor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    return cor;
  }

  private getIconeAleatorio(): string {
    const iconesDisponiveis = [
      'business',
      'card',
      'wifi',
      'server',
      'earth',
      'key',
      'lock-closed',
      'shield-checkmark',
      'color-palette',
      'bar-chart',
      'pie-chart',
      'settings',
      'terminal',
      'cloud',
    ];
    return iconesDisponiveis[
      Math.floor(Math.random() * iconesDisponiveis.length)
    ];
  }
}
