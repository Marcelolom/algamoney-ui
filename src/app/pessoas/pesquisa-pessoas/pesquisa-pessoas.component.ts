import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Table } from 'primeng/table';
import { MyErrorHandlerService } from './../../core/my-error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { PessoasService, PessoaFiltro } from './../pessoas.service';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html',
  styleUrls: ['./pesquisa-pessoas.component.css']
})

export class PesquisaPessoasComponent implements OnInit {

  constructor(
    private pessoasService: PessoasService,
    private confirmacao: ConfirmationService,
    private msgService: MessageService,
    private erroService: MyErrorHandlerService,
    private tituloService: Title) {  }

  pessoas = []; //@Output() pessoas = [] - componentizado
  filtro = new PessoaFiltro();// Paramentros da pesquisa. Declarada em lancamento service. tbem regs/por pagina
  totalRegistros = 0;         // Quant de registros retornados na consulta
  @ViewChild('ctrlTabela') tabela: Table;// ctrlTabela- na view #ctrlTabela

  ngOnInit(): void {
    this.tituloService.setTitle('Pesquisa de Pessoas');
  }

  // MÉTODO invocado ao clicar em pesquisar ou no submit do formulário
  pesquisar(pag = 0) { // recebe pagina q quer pesquisar. Default = 0

    this.filtro.pagina = pag; // define o numero de paginas

    // Recebe como parametro um objeto que pode conter nome, size, page
    this.pessoasService
      .listarPessoasComFiltro(this.filtro)
      .then(retorno => {
        this.totalRegistros = retorno.total;
        this.pessoas = [...retorno.respPessoas];
      });
  }

  // MÉTODO invocado qdo houver uma paginação na tabela de pessoas
  ocorreuPaginacao(evento: LazyLoadEvent) {
    const pagina = evento.first / evento.rows;
    this.pesquisar(pagina);
  }

  // METODO invocado ao clicar no botao excluir
  confirmarExclusao(pessoa: any) {
    this.confirmacao.confirm({
      header: `Exclusão de ${pessoa.nome}`,
      message: 'Confirma ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  // MÉTODO para excluir pessoa
  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
    .then( ()=> {
      this.atualizarTabela();
      this.msgService.add({severity:'warn', summary:'Ok!', detail:'Pessoa excluída!'});
    })
    .catch(erro => this.erroService.handleError(erro)); // trata erro
  }

  // MÉTODO para atualizar o status da pessoa
  mudarStatus(pessoa: any) {
    this.pessoasService.atualizarStatus(pessoa.codigo, pessoa.ativo)
    .then( ()=> {
      let msg = pessoa.ativo ? 'Pessoa ativada' : 'Pessoa desativada';
      this.msgService.add({severity:'warn', summary:'Ok!', detail:`${msg}`});
    })
    .catch(erro => this.erroService.handleError(erro)); // trata erro
  }

  // MÉTODO para dar um reset() na tabela
  atualizarTabela() {
    this.tabela.reset();
  }

}
