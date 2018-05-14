import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Lancamento } from './../../core/models';
import { PessoasService } from './../../pessoas/pessoas.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { MyErrorHandlerService } from './../../core/my-error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { LancamentoService } from './../lancamento.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.css']
})
export class CadastroLancamentoComponent implements OnInit{

  tipos = []; // Tipo Receita/Despesa
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  uploadEmAndamento = false;

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private myErrorService: MyErrorHandlerService,
    private lancamentoService: LancamentoService,
    private msgService: MessageService,
    private rota: ActivatedRoute,
    private tracadorDeRota: Router,
    private tituloService: Title) {
  }

  // ----------------------
  // Inicialização
  // ----------------------
  ngOnInit(): void {
    this.tituloService.setTitle('Cadastro de Lançamento');

    // Recuperando paramentros na url
    // this.rota.snapshot.params['codLanc'] -> retorna codigo como string
    // codLanc esta declarado no app.module - rotas
    const codigoLancamento = this.rota.snapshot.params['codLanc'];
    if (codigoLancamento) { // codLanc foi passado. Existe
      if (!Number.isNaN(codigoLancamento)) { //Se for um numnero
        this.carregarLancamentoPorCodigo(Number(codigoLancamento));
      }
    }

    // Carrega tipos Receita/Despesa
    this.tipos = [
      { label: 'Receita', value: 'RECEITA'},
      { label: 'Despesa', value: 'DESPESA'}
    ];

    this.carregarCategorias();
    this.carregarPessoas();
  }

  // ----------------------------
  // Carrega lançamento pelo código
  // ----------------------------
  carregarLancamentoPorCodigo(paramCodigo: number) {
    this.lancamentoService.buscarPorCodigo(paramCodigo)
    .then(lancamentoRetorno => {
      // console.log("Buscar por codigo. retornou algo");
      // console.log(lancamentoRetorno);
      this.lancamento = lancamentoRetorno;
    })
    .catch(erro => {
      this.myErrorService.handleError(erro);
      /*if (erro.status == 404) {
        this.tracadorDeRota.navigate(['pagina-nao-encontrada']); //direciona
      } else {
        this.myErrorService.handleError(erro);
      }*/
    });
  }

  // ----------------------------
  // Salvar lançamento
  // ----------------------------
  salvar(form: FormControl) {
    if (this.lancamento.codigo) {
      this.alterarLancamento(form);
    } else {
      this.incluirLancamento(form);
    }
  }

  // ----------------------
  // Incluir Lançamento
  // ----------------------
  incluirLancamento(form: FormControl) {
    this.lancamentoService.incluir(this.lancamento)
    .then(lancamentoAdicionado => {
      this.msgService.add({severity:'success', summary:'Ok!', detail:'Lançamento cadastrado'});
      // Navegação programática. Navigate recebe array
      this.tracadorDeRota.navigate(['lancamentos', lancamentoAdicionado.codigo]); //direciona para /lancamentos/codigo
    })
    .catch(erro => this.myErrorService.handleError(erro));
  }

  // ----------------------
  // Alterar Lançamento
  // ----------------------
  alterarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamentoAlterado => {
      this.msgService.add({severity:'success', summary:'Ok!', detail:'Lançamento salvo' });
      this.lancamento = lancamentoAlterado; // achei desnecessário isso, mas a algaworks acha importante
    })
    .catch(erro => this.myErrorService.handleError(erro));
  }

  // ----------------------
  // Carrega categorias
  // ----------------------
  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categoriasRetorno => {              /* label / value é o table que pede assim  */
        this.categorias = categoriasRetorno.map(cat => ({ label: cat.nome, value: cat.codigo }));
      })
      .catch(erro => this.myErrorService.handleError(erro));
  }

  // ----------------------
  // Carrega pessoas
  // ----------------------
  carregarPessoas() {
    this.pessoasService.listarPessoas()
    .then(pessoasRetorno => {
      this.pessoas = pessoasRetorno.map(p => ({ label: p.nome, value: p.codigo.toString() }));
    })
    .catch(erro => this.myErrorService.handleError(erro));
  }

  // ----------------------
  // Novo lançamento. Limpa os campos
  // ----------------------
  novo(form: FormControl) {
      form.reset(); // reset em todos campos
      // Existe um bug no form.reset(). Tudo indica que ele reseta assincronamente, assim o new lancamento parece
      // ocorrer antes do reset. Deixando de inicializar valores, no caso aqui, o botao Receita/Despesa não
      // selecionadava nenhuma das opções. O settimeout do javascript resolveu o problema
      setTimeout(() => {
        this.lancamento = new Lancamento();
      }, 1);

    // Faz uma navegação programática. Navigate recebe array
    // Dava pra colocar um routerlink na view
    this.tracadorDeRota.navigate(['lancamentos/novo']); //direciona para /lancamentos/novo
  }

  // ----------------------------
  // Metodos usados pelo fileUpload
  // ----------------------------
  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo(); // retorna <localhost:8080>/lancamentos/anexo
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    // Faz um salavrTemporario e Retorna { nome: <nome unico gerado> , url: null }
    const anexoResposta = JSON.parse(event.xhr.response);
    console.log('Nome do arquivo=',anexoResposta.nome);
    console.log('url=',anexoResposta.url);
    this.lancamento.anexo = anexoResposta.nome;
    this.lancamento.urlAnexo = anexoResposta.url;
    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.lancamento.anexo = null;
    this.lancamento.urlAnexo = null;
  }

  erroUpload(event) {
    this.msgService.add({severity:'error', summary:'Ok!', detail:'Erro ao tentar enviar anexo!' });
    this.uploadEmAndamento = false;
  }

}
