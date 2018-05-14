import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/components/common/messageservice';
import { AutenticacaoService } from './../../seguranca/autenticacao.service';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { MyErrorHandlerService } from './../../core/my-error-handler.service';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})

export class PesquisaLancamentosComponent implements OnInit {

  constructor(
    private authService: AutenticacaoService,
    private lancamentoService: LancamentoService,
    private msgService: MessageService,
    private confirmacao: ConfirmationService,
    private erroService: MyErrorHandlerService,
    private tituloService: Title) {
      // Title : serviço disponivel do angular para alterar titulo da pagina dinamicamente
      // exportado no Core
    }

  lancamentos = [];     // array de lançamentos @Output()
  filtro = new LancamentoFiltro();// Paramentros da pesquisa. Declarada em lancamento service. tbem regs/por pagina
  totalRegistros = 0;             // Quant de registros retornados na consulta
  carregando: boolean = true;     // pode ser usado na propriedade 'load' da table. Mostra icone ao carregar.
  @ViewChild('ctrlTabela') tabela: Table;// ctrlTabela- na view #ctrlTabela

  // --------------------------------------------------------------------
  // MÉTODO invocado ao iniciar
  // --------------------------------------------------------------------
  ngOnInit(): void {
   this.tituloService.setTitle('Pesquisa de Lançamentos');
  }

  // --------------------------------------------------------------------
  // MÉTODO invocado ao clicar no btn Pesquisar ou no submmit o formulário
  // --------------------------------------------------------------------
  pesquisarResumo(pag = 0) { // recebe pagina q quer pesquisar. Default = 0
    this.carregando = true; // mostrar icone carregando

    this.filtro.pagina = pag; // define o numero da pagina. Ver metodo ocorreuPaginacao

    // Recebe como parametro um objeto que pode conter descricao , dataVencimentoDe , dataVencimentoAte
    this.lancamentoService
    .listarTodosResumo(this.filtro)
    .then(retorno => {
      this.totalRegistros = retorno.total;
      this.lancamentos = [...retorno.respLancamentos];
      this.carregando = false; // esconde icone carregando
    })
    .catch(erro => this.erroService.handleError(erro)); // trata erro
  }

  // --------------------------------------------------------------------
  // MÉTODO invocado qdo houver uma paginação na tabela de lançamentos
  // --------------------------------------------------------------------
  ocorreuPaginacao(evento: LazyLoadEvent) {
    const pagina = evento.first / evento.rows;
    this.pesquisarResumo(pagina);
  }

  // --------------------------------------------------------------------
  // METODO invocado ao clicar no botao excluir da view
  // --------------------------------------------------------------------
  confirmarExclusao(lancamento: any) {
    this.confirmacao.confirm({
      header: 'Exclusão de lançamento',
      message: 'Confirma ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  // --------------------------------------------------------------------
  // MÉTODO para excluir um lançamento. Invocado por confirmarEclusão()
  // --------------------------------------------------------------------
  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then( ()=> {
        this.atualizarTabela();
        this.msgService.add({severity:'warn', summary:'Ok!', detail:'Lançamento excluído!'});
      })
      .catch(erro => this.erroService.handleError(erro)); // trata erro
  }

  // --------------------------------------------------------------------
  // MÉTODO para dar um reset() na tabela
  // --------------------------------------------------------------------
  atualizarTabela() {
    this.tabela.reset();
  }

}
