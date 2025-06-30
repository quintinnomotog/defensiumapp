import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  checkmarkCircleOutline,
  closeCircleOutline,
  documentTextOutline,
  eyeOffOutline,
  eyeOutline,
  keyOutline,
  lockClosedOutline,
  mailOutline,
  personOutline,
  reloadOutline,
} from 'ionicons/icons';
import { CredencialModel } from 'src/app/model/credencial.model';
import { CategoriaCredencialService } from 'src/app/service/categoria-credencial.service';
import { CredencialService } from 'src/app/service/credencial.service';
import { GeradorSenhaService } from 'src/app/service/gerador-senha.service';
import { PessoaCadastrarPage } from '../pessoa-cadastrar/pessoa-cadastrar.page';

@Component({
  selector: 'app-credencial-cadastrar',
  templateUrl: './credencial-cadastrar.page.html',
  styleUrls: ['./credencial-cadastrar.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonIcon,
    IonContent,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CredencialCadastrarPage implements OnInit {
  private modalController = inject(ModalController);

  private popoverController = inject(PopoverController);

  public credencialFormGroup!: FormGroup;

  private credencialService = inject(CredencialService);

  private toastController = inject(ToastController);

  public categoriaCredencialList: any[] = [];

  private categoriaCredencialService = inject(CategoriaCredencialService);

  public isLoading: boolean = true;

  public iconeVerificarSenha: string = 'eye-off-outline';

  public tipoInpuSenha: string = 'password';

  private geradorSenhaService = inject(GeradorSenhaService);

  private instituicaoList: any[] = [
    { code: 1, nome: 'Google' },
    { code: 2, nome: 'Microsoft' },
    { code: 3, nome: 'Dribbble' },
    { code: 4, nome: 'Amazon' },
    { code: 5, nome: 'Apple' },
    { code: 6, nome: 'Netflix' },
    { code: 7, nome: 'Spotify' },
    { code: 8, nome: 'Facebook' },
    { code: 9, nome: 'Twitter' },
    { code: 10, nome: 'LinkedIn' },
    { code: 11, nome: 'GitHub' },
    { code: 12, nome: 'Adobe' },
    { code: 13, nome: 'IBM' },
    { code: 14, nome: 'Salesforce' },
    { code: 15, nome: 'Oracle' },
  ];

  public isApresentarListaResultadoPesquisa: boolean = false;

  public nomeIntituicaoPesquisa: string = '';

  public instituicaoFiltradaList: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    addIcons({
      add,
      personOutline,
      mailOutline,
      documentTextOutline,
      lockClosedOutline,
      reloadOutline,
      eyeOffOutline,
      eyeOutline,
      closeCircleOutline,
      checkmarkCircleOutline,
      keyOutline,
    });
    this.configurarFormulario();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getCategoriaCredencial();
  }

  public configurarFormulario() {
    this.credencialFormGroup = this.formBuilder.group({
      codigoInstituicao: ['', Validators.required],
      nomeInstituicao: ['', Validators.required],
      categoriaCredencialEntity: ['', Validators.required],
      pessoaEntity: [1, Validators.required],
      identificador: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      descricao: ['', Validators.required],
      link: [''],
      observacao: [''],
    });
  }

  public gerarSenha() {
    this.credencialFormGroup.patchValue({
      senha: this.geradorSenhaService.gerarSenha(),
    });
  }

  public async abrirModalPessoaCadastrar() {
    // await this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PessoaCadastrarPage,
      cssClass: 'modal-secundaria',
      // backdropDismiss: false,
      // showBackdrop: true,
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role !== 'cancel') {
      // Reabre a primária
      // this.openPrimaryModal();
    }
  }

  public async abrirPopoverPessoaCadastrar() {
    const popover = await this.popoverController.create({
      component: PessoaCadastrarPage,
      cssClass: 'popover',
    });
    return await popover.present();
  }

  public onCreate() {
    if (this.credencialFormGroup.valid) {
      const credencialModel = this.configurarCredencialModel();
      this.credencialService.create(credencialModel).subscribe({
        next: async (response) => {
          this.apresentarToastSucesso();
          this.clearFormulario();
          this.getFecharModal();
        },
        error: async (response) => {
          console.error('Erro ao salvar credencial:', response);
          this.apresentarToastErro();
        },
      });
    }
  }

  private clearFormulario() {
    this.credencialFormGroup.reset();
  }

  private configurarCredencialModel(): CredencialModel {
    return {
      identificador: this.credencialFormGroup.get('identificador')?.value,
      senha: this.credencialFormGroup.get('senha')?.value,
      categoriaCredencialEntity: {
        code: this.credencialFormGroup.get('categoriaCredencialEntity')?.value,
        codePublic: '',
        descricao: '',
      },
      pessoaEntity: {
        code: this.credencialFormGroup.get('pessoaEntity')?.value,
      },
      descricao: this.credencialFormGroup.get('descricao')?.value,
      link: this.credencialFormGroup.get('link')?.value,
      observacao: this.credencialFormGroup.get('observacao')?.value,
    };
  }

  private async apresentarToastSucesso() {
    const toast = await this.toastController.create({
      message: 'Credencial Cadastrada com Sucesso!',
      duration: 3000,
      color: 'success',
      animated: true,
      icon: 'checkmark-circle-outline',
      position: 'top',
    });
    return toast.present();
  }

  private async apresentarToastErro() {
    const toast = await this.toastController.create({
      message: 'Falha ao tentar cadastrar Credencial!',
      duration: 3000,
      color: 'danger',
      animated: true,
      icon: 'close-circle-outline',
      position: 'top',
    });
    return toast.present();
  }

  private redirecionarTela() {}

  private getFecharModal() {
    this.modalController.dismiss(null, 'salvo');
  }

  public isCampoInvalido(nomeCampoFormulario: string): boolean {
    const formularioGroup = this.credencialFormGroup.get(nomeCampoFormulario);
    return formularioGroup!.invalid && formularioGroup!.touched;
  }

  public getCategoriaCredencial() {
    this.isLoading = true;
    this.categoriaCredencialService.getFindAll().subscribe({
      next: async (response) => {
        this.categoriaCredencialList = response;
        this.isLoading = false;
      },
      error: async (response) => {
        console.error('Erro ao realizar a requisição:', response);
      },
    });
  }

  public selecionarCategoriaCredencial(item: any) {
    this.credencialFormGroup.patchValue({
      categoriaCredencialEntity: item.code,
    });
  }

  public apresentarOcultarSenha() {
    if (this.tipoInpuSenha === 'password') {
      this.tipoInpuSenha = 'text';
      this.iconeVerificarSenha = 'eye-outline';
    } else {
      this.tipoInpuSenha = 'password';
      this.iconeVerificarSenha = 'eye-off-outline';
    }
  }

  public pesquisarInstituicao(event: any) {
    this.credencialFormGroup.get('nomeInstituicao')?.valueChanges.subscribe((valorDigitado: string) => {
        if (valorDigitado && valorDigitado.length > 1) {
          const termo = valorDigitado.toLowerCase();
          this.instituicaoFiltradaList = this.instituicaoList.filter((item) =>
            item.nome.toLowerCase().includes(termo)
          );
          this.isApresentarListaResultadoPesquisa = this.instituicaoFiltradaList.length > 0;
        } else {
          this.instituicaoFiltradaList = [];
          this.isApresentarListaResultadoPesquisa = false;
        }
      });
  }

  public selecionarInstituicao(item: any) {
    this.credencialFormGroup.patchValue({
      codigoInstituicao: item.code,
      nomeInstituicao: item.nome,
    });
    this.isApresentarListaResultadoPesquisa = false;
    console.log(this.credencialFormGroup.value);
  }
  
}
