import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
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
  reloadOutline, calendarClearOutline, calendarOutline } from 'ionicons/icons';
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
    NgxMaskDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ provideNgxMask() ],
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
    addIcons({add,personOutline,documentTextOutline,mailOutline,calendarClearOutline,calendarOutline,lockClosedOutline,reloadOutline,eyeOffOutline,eyeOutline,closeCircleOutline,checkmarkCircleOutline,keyOutline,});
    this.configurarFormulario();
  }

  ngOnInit() {
    this.recuperarPessoa();
    this.credencialFormGroup.get('categoriaCredencialEntity')?.valueChanges.subscribe(() => {
      this.configurarFormularioPorCategoria();
    });
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
      databaseHostname: [''],
      databasePorta: [''],
      databaseNome: [''],
      databaseUsuario: [''],
      cartaoBancarioNomeTitular: [''],
      cartaoBancarioNumeroCartao: [''],
      cartaoBancarioMesVencimento: [''],
      cartaoBancarioAnoVencimento: [''],
      cartaoBancarioCvv: [''],
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
      debugger
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

      databaseHostname: this.credencialFormGroup.get('databaseHostname')?.value,
      databasePorta: this.credencialFormGroup.get('databasePorta')?.value,
      databaseNome: this.credencialFormGroup.get('databaseNome')?.value,
      databaseUsuario: this.credencialFormGroup.get('databaseUsuario')?.value,

      cartaoBancarioNomeTitular: this.credencialFormGroup.get('cartaoBancarioNomeTitular')?.value,
      cartaoBancarioNumeroCartao: this.credencialFormGroup.get('cartaoBancarioNumeroCartao')?.value,
      cartaoBancarioMesVencimento: this.credencialFormGroup.get('cartaoBancarioMesVencimento')?.value,
      cartaoBancarioAnoVencimento: this.credencialFormGroup.get('cartaoBancarioAnoVencimento')?.value,
      cartaoBancarioCvv: this.credencialFormGroup.get('cartaoBancarioCvv')?.value,
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

  public configurarFormularioPorCategoria() {
    const categoriaCODE = this.credencialFormGroup.get("categoriaCredencialEntity")?.value;
    switch (categoriaCODE) {
      case 8: // Senha Simples
        this.recuperarUsuarioLogado();
        // Obrigatórios
        this.credencialFormGroup.get('nomeInstituicao')?.setValidators([Validators.required]); // É obrigatório, mas setado automaticamente com o codigo do Usuário do Sistema
        this.credencialFormGroup.get('descricao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('senha')?.setValidators([Validators.required]);
        // Não obrigatórios
        this.credencialFormGroup.get('nomeInstituicao')?.clearValidators();
        this.credencialFormGroup.get('pessoaID')?.clearValidators();
        this.credencialFormGroup.get('identificador')?.clearValidators();
        this.credencialFormGroup.get('link')?.clearValidators();
        this.credencialFormGroup.get('observacao')?.clearValidators();
        break;
      case 2: // Credencial
        this.clearformularioUsuarioLogado();
        // Obrigatórios
        this.credencialFormGroup.get('nomeInstituicao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('descricao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('identificador')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('senha')?.setValidators([Validators.required]);
        // Não obrigatórios
        this.credencialFormGroup.get('link')?.clearValidators();
        break;
      case 5: // WI-FI
        this.recuperarUsuarioLogado();
        // Obrigatórios
        this.credencialFormGroup.get('nomeInstituicao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('descricao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('senha')?.setValidators([Validators.required]);
        // Não obrigatórios
        this.credencialFormGroup.get('identificador')?.clearValidators();
        this.credencialFormGroup.get('link')?.clearValidators();
        break;
      case 6: // Banco de Dados
        this.recuperarUsuarioLogado();
        // Obrigatórios
        this.credencialFormGroup.get('categoriaCredencialEntity')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('nomeInstituicao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('descricao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('databasehostname')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('databasename')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('databaseusername')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('databaseport')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('senha')?.setValidators([Validators.required]);
        // Não obrigatórios
        this.credencialFormGroup.get('identificador')?.clearValidators();
        this.credencialFormGroup.get('link')?.clearValidators();
        break;
      case 3: // Cartão Bancário
        this.clearformularioUsuarioLogado();
        // Obrigatórios
        this.credencialFormGroup.get('categoriaCredencialEntity')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('nomeInstituicao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('descricao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('cartaoBancarioNomeTitular')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('cartaoBancarioNumeroCartao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('cartaoBancarioMesVencimento')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('cartaoBancarioAnoVencimento')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('cartaoBancarioCvv')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('senha')?.setValidators([Validators.required]);
        // Não obrigatórios
        this.credencialFormGroup.get('identificador')?.clearValidators();
        this.credencialFormGroup.get('link')?.clearValidators();
        break;
      default:
        this.credencialFormGroup.get('nomeInstituicao')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('identificador')?.setValidators([Validators.required]);
        this.credencialFormGroup.get('link')?.clearValidators();
        break;
    }
    // Atualiza os validadores após configurar
    this.credencialFormGroup.get('nomeInstituicao')?.updateValueAndValidity();
    this.credencialFormGroup.get('descricao')?.updateValueAndValidity();
    this.credencialFormGroup.get('link')?.updateValueAndValidity();
    this.credencialFormGroup.get('senha')?.updateValueAndValidity();
    this.credencialFormGroup.get('pessoaID')?.updateValueAndValidity();
    this.credencialFormGroup.get('identificador')?.updateValueAndValidity();
    this.credencialFormGroup.get('observacao')?.updateValueAndValidity();
    return this.credencialFormGroup.valid;
  }

  // MOCK
  private recuperarUsuarioLogado() {
    this.credencialFormGroup.patchValue({
      nomeInstituicao: "José Quintino",
      pessoaID: 1
    });
  }

  private clearformularioUsuarioLogado() {
    this.credencialFormGroup.patchValue({
      nomeInstituicao: undefined,
      pessoaID: undefined
    });
  }

  public isCampoFormularioObrigatorio(campoFormulario: any) {
    const control = this.credencialFormGroup.get(campoFormulario);
    if (!control || !control.validator) return false;
    const validator = control.validator({} as AbstractControl);
    return validator && validator['required'];
  }

}
