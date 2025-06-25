import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonContent, IonHeader, IonSearchbar, IonText, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copy, copyOutline, notifications, notificationsOutline, reload, reloadOutline } from 'ionicons/icons';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [HttpClientModule, IonSearchbar, IonText, IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CredencialService
  ]
})
export class PrincipalPage implements OnInit {

  private toastController = inject(ToastController);

  private credencialService = inject(CredencialService);

  public credencialList: any[] = [];

  public isAnimacaoAtivada: boolean = false;

  constructor() {
    addIcons({ reload, notifications, copyOutline, notificationsOutline, reloadOutline, copy });
  }

  ngOnInit() {
    this.findAll();
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
        console.log(response);
        this.credencialList = response.objectList;
      },
      error: (error) => {
        console.error('Erro ao buscar credenciais:', error);
      }
    });
    this.isAnimacaoAtivada = false;
  }

  public getRecuperarNome(item: any) {
    return item.descricao.charAt(0).toUpperCase();
  }

  public async emitirMensagemToast() {
    const toast = await this.toastController.create({
      message: "Senha copiada para a área de transferência!",
      duration: 1500,
      color: "primary",
      position: "bottom"
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

}
