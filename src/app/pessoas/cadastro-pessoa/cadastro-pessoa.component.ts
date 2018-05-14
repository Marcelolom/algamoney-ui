import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorHandlerService } from './../../core/my-error-handler.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { Pessoa, Contato } from './../../core/models';
import { PessoasService } from '../pessoas.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit{
  // ----------------------------
  // Propriedades
  // ----------------------------
  pessoa = new Pessoa();

  // ----------------------------
  // Construtor
  // ----------------------------
  constructor(
    private pessoaService: PessoasService,
    private msgService: MessageService,
    private erroService: MyErrorHandlerService,
    private rota: ActivatedRoute,
    private tituloService: Title,
    private tracadorDeRota: Router) {
  }

  // ----------------------------
  // OnInit
  // ----------------------------
  ngOnInit(): void {
    this.tituloService.setTitle('Inclusão de Pessoa');
    // Recuperando paramentros na url
    // this.rota.snapshot.params['codLanc'] -> retorna codigo como string
    // codLanc esta declarado no app.module
    const codigoPessoa = this.rota.snapshot.params['codPessoa'];
    if (codigoPessoa) { // codLanc foi passado. Existe
      if (!Number.isNaN(codigoPessoa)) { //Se for um numnero
        this.carregarPessoaPorCodigo(Number(codigoPessoa));
      }
    }
  }

  // ----------------------------
  // Salvar lançamento
  // ----------------------------
  salvar(form: FormControl) {
    if (this.pessoa.codigo) {
      this.alterarPessoa(form);
    } else {
      this.incluirPessoa(form);
    }
  }

  // ----------------------------
  // Incluir Pessoa
  // ----------------------------
  incluirPessoa(form: FormControl) {
    this.pessoaService.incluir(this.pessoa)
      .then(() => {
        this.msgService.add({severity:'success', summary:'Ok!', detail:'Cadastro efetuado'});
        // Chama o metodo novo pra resetar o formulário
        this.novo(form);
      })
      .catch(erro => this.erroService.handleError(erro));
  }

  // ----------------------
  // Alterar Pessoa
  // ----------------------
  alterarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoaAlterada => {
      this.msgService.add({severity:'success', summary:'Ok!', detail:'Registro salvo'});
      this.pessoa = pessoaAlterada; //achei desnecessário isso, mas a algaworks acha importante
    })
    .catch(erro => this.erroService.handleError(erro));
  }

  // ----------------------------
  // Esse metodo foi criado para validar o campo CEP
  // ----------------------------
  digitou(controle: FormControl) {
    let t: String = this.pessoa.endereco.cep;

    if (t != null) {
      t = t.replace("\_","");
    }

    if (t != null && t.length < 9) {
      this.pessoa.endereco.cep = null;
    }
  }

  // ----------------------------
  // Carrega pessoa pelo código
  // ----------------------------
  carregarPessoaPorCodigo(paramCodigo: number) {
    this.pessoaService.buscarPorCodigo(paramCodigo)
    .then(pessoaRetorno => {
      this.pessoa = pessoaRetorno;
      this.tituloService.setTitle('Alteração de Pessoa');
    })
    .catch(erro => this.erroService.handleError(erro));
  }

  // -----------------------------------------------
  // Método chamado pelo botão Novo. Limpa os campos
  // -----------------------------------------------
  novo(form: FormControl) {
    form.reset(); // reset em todos campos
    // Existe um bug no form.reset(). Tudo indica que ele reseta assincronamente, assim o new lancamento parece
    // ocorrer antes do reset. Deixando de inicializar valores, no caso aqui, o botao Receita/Despesa não
    // selecionadava nenhuma das opções. O settimeout do javascript resolveu o problema
    setTimeout(() => { this.pessoa = new Pessoa(); }, 1);

    // Faz uma navegação programática. Navigate recebe array
    // Mas tbem dava pra colocar um routerlink na view
    this.tracadorDeRota.navigate(['pessoas/nova']); //direciona para /pessoas/nova
  }

}
