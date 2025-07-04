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
  IonContent,
  IonHeader,
  IonText,
  IonToolbar,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barChart,
  business,
  card,
  cardOutline,
  cashOutline,
  cloud,
  colorPalette,
  copy,
  copyOutline,
  earth,
  key,
  keyOutline,
  lockClosed,
  lockClosedOutline,
  logoGoogle,
  logoMicrosoft,
  logoWindows,
  notifications,
  notificationsOutline,
  pieChart,
  reload,
  reloadOutline,
  server,
  serverOutline,
  settings,
  shieldCheckmark,
  terminal,
  wifi,
  wifiOutline,
} from 'ionicons/icons';
import { CredencialService } from 'src/app/service/credencial.service';
import { EventoService } from 'src/app/service/evento.service';
import { CategoriaCredencialService } from '../../service/categoria-credencial.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    IonText,
    IonAvatar,
    IonContent,
    IonHeader,
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

  private eventoService = inject(EventoService);

  private subscription: any;

  private numeroPagina: number = 0;

  private numeroResultadoPagina = 5;

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
      lockClosedOutline,
      cardOutline,
      cashOutline,
      wifiOutline,
      serverOutline,
      keyOutline,
    });
  }

  ngOnInit() {
    this.findAll(undefined, true);
    this.recuperarCategoriaCredencial();
    this.subscription = this.eventoService.credencialAtualizada$.subscribe(() => {
      this.findAll(undefined, true);
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewWillEnter() { }

  public async copiarSenha(credencial: any) {
    this.credencialService.getRecuperarSenha(credencial.codePublic).subscribe({
      next: async (response) => {
        await navigator.clipboard.writeText(response.senha);
        this.emitirMensagemToast();
      },
      error: async (response) => { }
    });
  }

  public findAll(event?: any, reset: boolean = false): void {

    if (reset) {
      this.numeroPagina = 0;
      this.credencialList = [];
    }

    this.credencialService.findAll(this.numeroPagina, this.numeroResultadoPagina).subscribe({
      next: (response: any) => {
        this.credencialList = this.credencialList.concat(response.content);
        this.numeroPagina++;
        if (event) {
          event.target.complete();
        }
      },
      error: (error) => {
        console.error('Erro ao buscar credenciais:', error);
      },
    });
    this.isAnimacaoAtivada = false;
  }


  public getRecuperarNome(item: any) {
    return item.nomePessoa.charAt(0).toUpperCase();
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
        this.categoriaCredencialList = response;
        // .map(
        //   (categoriaCredencial: any) => {
        //     categoriaCredencial.icone = this.getIconeAleatorio();
        //     categoriaCredencial.corIcone = this.getCorPorCategoria();
        //     categoriaCredencial.background = this.getCorPorCategoria();
        //     return categoriaCredencial;
        //   }
        // );
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

  public recuperarCredencial(event: any) {
    this.findAll(event);
  }

}
