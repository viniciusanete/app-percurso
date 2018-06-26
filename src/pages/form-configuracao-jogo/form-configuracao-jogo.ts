import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ConfiguracaoJogoService } from '../../services/domain/configuracao-jogo.service';

/**
 * Generated class for the FormConfiguracaoJogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-configuracao-jogo',
  templateUrl: 'form-configuracao-jogo.html',
})
export class FormConfiguracaoJogoPage {
  cores;
  quantidadePerguntaAvatar;
  numeroCoresAvatarInput = [];
  quantidadeMensagem;
  mensagemInput = [];

  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl:AlertController,
    public configuracaoJogoService:ConfiguracaoJogoService
  ) {
    this.quantidadePerguntaAvatar = [
      {
      }
    ]
    this.quantidadeMensagem = [
      {
      }
    ]
    this.formGroup = this.formBuilder.group({
      coresTabuleiro: [null, [Validators.required]],
      coresAvatar: [[], [Validators.required]],
      mensagensUltimaCasa: [[], [Validators.required]]
    });
  }
  ionViewDidLoad(){
      this.configuracaoJogoService.obterCores().subscribe(res=>{
        let coresTratadas = []
        let i = 0
        res.forEach(element => {
          coresTratadas.push({id:i,cor:element})
          i++;
        });
        this.cores = coresTratadas
        console.log(this.cores)

      })
  }

  adicionarCorAvatar(){
    this.quantidadePerguntaAvatar.push({});
  }
  inserirCor(e){
    this.numeroCoresAvatarInput.push(e)
    console.log(this.numeroCoresAvatarInput)
  }

  adicionarMensagem(){
    this.quantidadeMensagem.push({});
  }
  inserirMensagem(e){
    this.mensagemInput.push(e)
    console.log('inserirMensagem',this.mensagemInput)
  }

  enviarConfiguracao(){
    this.formGroup.controls.coresAvatar.setValue(this.numeroCoresAvatarInput);
    this.formGroup.controls.mensagensUltimaCasa.setValue(this.mensagemInput);

    this.configuracaoJogoService.cadastrarConfiguracoesGerais(this.formGroup.value)
    .subscribe(response=>{
      this.alertSucessoCadastro()
    },
  error =>{});
    }

    alertSucessoCadastro(){
      let alert = this.alertCtrl.create({
        title:'Sucesso!',
        message:'Configurações definidas!',
        enableBackdropDismiss:false,
        buttons:[
          {
            text:'Ok',
            handler:() =>{
              this.navCtrl.setRoot(HomePage);
            }
          }
        ]
      });
      alert.present();
    }

  }
