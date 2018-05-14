import { RelatoriosModule } from './relatorios/relatorios.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AcessoNegadoComponent } from './core/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { AutenticacaoGuard } from './seguranca/autenticacao.guard';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PesquisaLancamentosComponent } from './lancamentos/pesquisa-lancamentos/pesquisa-lancamentos.component';
import { CadastroLancamentoComponent } from './lancamentos/cadastro-lancamento/cadastro-lancamento.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { PesquisaPessoasComponent } from './pessoas/pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './pessoas/cadastro-pessoa/cadastro-pessoa.component';
import { TesteNgmodelComponent } from './temp/teste-ngmodel/teste-ngmodel.component';
import { PainelModule } from './painel/painel.module';
import { RelatoriosRoutingModule } from './relatorios/relatorios-routing.module';

@NgModule(
  {
    declarations: [ AppComponent ],
    imports:
    [ BrowserModule,
      BrowserAnimationsModule,
      HttpModule,
      FormsModule, // temp/teste-ngmodel

      CoreModule,
      LancamentosModule,
      PessoasModule,
      SegurancaModule,
      PainelModule,
      RelatoriosModule,
      AppRoutingModule // modulo de roteamento
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent] // informa qual componente inicia a aplicação
  }
)
export class AppModule { }
