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
import { EventoService } from 'src/app/service/evento.service';
import { GeradorSenhaService } from 'src/app/service/gerador-senha.service';
import { PessoaService } from 'src/app/service/pessoa.service';
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

  public isApresentarListaResultadoPesquisa: boolean = false;

  public nomeIntituicaoPesquisa: string = '';

  public instituicaoFiltradaList: any[] = [];

  private pessoaService = inject(PessoaService);

  public pessoaList: any[] = [];

  private eventoService = inject(EventoService);

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

  ngOnInit() {
    this.recuperarPessoa();
  }

  ionViewDidEnter() {
    this.getCategoriaCredencial();
  }

  public configurarFormulario() {
    this.credencialFormGroup = this.formBuilder.group({
      nomeInstituicao: ['', Validators.required],
      categoriaCredencialEntity: ['2', Validators.required],
      pessoaID: [""],
      identificador: ['', [Validators.required]],
      senha: ['', Validators.required],
      descricao: [''],
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
    debugger
    if (this.credencialFormGroup.valid) {
      const credencialModel = this.configurarCredencialModel();
      this.credencialService.create(credencialModel).subscribe({
        next: async (response) => {
          this.apresentarToastSucesso();
          this.clearFormulario();
          this.eventoService.emitirAtualizacaoCredencial();
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
        code: this.credencialFormGroup.get('pessoaID')?.value,
        nome: this.credencialFormGroup.get("nomeInstituicao")?.value,
        codePublic: "",
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

  private redirecionarTela() { }

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
        const categoriaPadrao = this.categoriaCredencialList.find(categoriaFind => categoriaFind.code === 2);
        if (categoriaPadrao) {
          this.credencialFormGroup.patchValue({
            categoriaCredencialEntity: categoriaPadrao.code
          });
        }
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
      if (valorDigitado && valorDigitado.length >= 1) {
        const termo = valorDigitado.toLowerCase();
        this.instituicaoFiltradaList = this.pessoaList.filter((item) =>
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
    debugger
    this.credencialFormGroup.patchValue({
      nomeInstituicao: item.nome,
      pessoaID: item.code
    });
    this.isApresentarListaResultadoPesquisa = false;
  }

  public async recuperarPessoa() {
    await this.pessoaService.getFindAll().subscribe({
      next: (response) => {
        this.pessoaList = response;
      },
      error: (response) => {
        console.error("Falha ao tentar recuperar a lista de Pessoas!");
      }
    });
  }

}
