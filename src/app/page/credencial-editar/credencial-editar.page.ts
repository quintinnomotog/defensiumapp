import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ToastController, IonButton, IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/angular/standalone';
import { CredencialModel } from 'src/app/model/credencial.model';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-credencial-editar',
  templateUrl: './credencial-editar.page.html',
  styleUrls: ['./credencial-editar.page.scss'],
  standalone: true,
  imports: [IonText, IonTitle, IonToolbar, IonHeader, IonButton, IonContent, CommonModule, FormsModule]
})
export class CredencialEditarPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  private credencialService = inject(CredencialService);

  private credencialModel: CredencialModel | undefined;

  private toastController = inject(ToastController);

  constructor() { }

  ngOnInit() {
    this.getCodePublicParameter();
    this.getCredencialModel();
  }

  private getCodePublicParameter(): any {
    return this.activatedRoute.snapshot.paramMap.get('codePublic');
  }

  public getCredencialModel() {
    this.credencialService.findOne(this.getCodePublicParameter()).subscribe({
      next: ( response: any ) => {
        this.credencialModel = response;
      },
      error: ( response:any ) => {
        console.error("Falha ao tentar recuperar os dados da Credencial!");
        this.showToast("Falha ao tentar recuperar os dados da Credencial!", true);
      }
    });
  }

  // FIXME: Criar componente de Toast global
  private async showToast(mensagem: string, isError: boolean) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: "top",
      color: isError ? "danger" : "success",
    });
    return toast.present();
  }

}
