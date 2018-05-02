
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { TesteNgmodelComponent } from './temp/teste-ngmodel/teste-ngmodel.component';
import { PesquisaLancamentosComponent } from './lancamentos/pesquisa-lancamentos/pesquisa-lancamentos.component';
import { CadastroLancamentoComponent } from './lancamentos/cadastro-lancamento/cadastro-lancamento.component';
import { PesquisaPessoasComponent } from './pessoas/pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './pessoas/cadastro-pessoa/cadastro-pessoa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { AcessoNegadoComponent } from './core/acesso-negado.component';
import { AutenticacaoGuard } from './seguranca/autenticacao.guard';

/*  ---Definição das rotas--- */
  // ROLE_CADASTRAR_CATEGORIA, ROLE_PESQUISAR_CATEGORIA
  // ROLE_CADASTRAR_PESSOA, ROLE_REMOVER_PESSOA, ROLE_PESQUISAR_PESSOA
  // ROLE_CADASTRAR_LANCAMENTO, ROLE_REMOVER_LANCAMENTO, ROLE_PESQUISAR_LANCAMENTO
// 1)
const rotas: Routes = [


  { /* localhost:4200/lancamentos -> Pesquisa Lancamentos */
    path: 'lancamentos',
    component: PesquisaLancamentosComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  { /*  4200:/lancamentos/novo */
    path: 'lancamentos/novo',
    component: CadastroLancamentoComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  { /*  4200:/lancamentos/12 ediçao*/
    path: 'lancamentos/:codLanc',
    component: CadastroLancamentoComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  { /*  4200:/pessoas  */
    path: 'pessoas',
    component: PesquisaPessoasComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  { /*  4200:/pessoas/nova  */
    path: 'pessoas/nova',
    component: CadastroPessoaComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  { /*  4200:/pessoas/2  */
    path: 'pessoas/:codPessoa',
    component: CadastroPessoaComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'acesso-negado', component: AcessoNegadoComponent},  /*  4200:/pessoas/nova  */
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},  /*  4200:/pessoas/nova  */
  { path: '**', redirectTo: 'pagina-nao-encontrada'},  /* qq coisa diferente das rotas configuradas, é redirecionada  */
];
// 2) importar o routerModule aqui e no CoreModule
// 3) colocar a directiva na view <router-outlet>
// 4) import
/*  ------------------------- */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(rotas),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]

})
export class AppModule { }
