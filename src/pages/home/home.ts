import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ConfiguracaoJogoService } from '../../services/domain/configuracao-jogo.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  formGroup: FormGroup;
  temas = [];
  quantidadeResposta = [];
  dificuldades = [];
  teste = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl:AlertController,
    public configuracaoJogoService:ConfiguracaoJogoService) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      dificuldade: [null, [Validators.required]],
      enunciado: [null, [Validators.required]],
      tema: [null],
      resposta: [null],
      respostaCerta: [null],
      opcoes: [null]


    }); this.quantidadeResposta = [{}];
  }
  ionViewDidLoad(){
    this.configuracaoJogoService.obterTemas().subscribe(res=>{
      this.temas = res;
      console.log('temas',this.temas);

    })
  }
  carregarTemas() {
    this.configuracaoJogoService.obterTemas().subscribe(res => {
      this.temas = res;
      console.log(this.temas);
    });
  }

  carregarCores() {
    this.configuracaoJogoService.obterDificuldades().subscribe(res => {
      this.dificuldades = res;
    });
  }
  confirmarResposta(){
    this.teste
    .push({resposta:this.formGroup.value.resposta,respostaCerta:this.formGroup.value.respostaCerta})

    console.log(this.teste);


  }
  enviarQuestao() {
     this.formGroup.removeControl('respostaCerta')
     this.formGroup.removeControl('resposta')

    this.formGroup.controls.opcoes.setValue(this.teste);
    console.log(this.formGroup.value.opcoes);
    console.log(this.formGroup.value);
    this.configuracaoJogoService.cadastrarQuestao(this.formGroup.value).subscribe(res =>{
      this.alertSucessoCadastro()

    })

  }
  adicionarResposta() {
    this.quantidadeResposta.push({});
  }
  definifirTema(){
    this.configuracaoJogoService.cadastrarTema(this.formGroup.value)
    .subscribe(response=>{
      this.alertSucessoCadastro()
    },
  error =>{});
    }



  alertSucessoCadastro(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Tema definido!',
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




