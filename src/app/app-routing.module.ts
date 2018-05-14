import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AcessoNegadoComponent } from "./core/acesso-negado.component";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { AutenticacaoGuard } from "./seguranca/autenticacao.guard";
import { LoginFormComponent } from "./seguranca/login-form/login-form.component";
import { PesquisaLancamentosComponent } from "./lancamentos/pesquisa-lancamentos/pesquisa-lancamentos.component";
import { CadastroLancamentoComponent } from "./lancamentos/cadastro-lancamento/cadastro-lancamento.component";
import { PesquisaPessoasComponent } from "./pessoas/pesquisa-pessoas/pesquisa-pessoas.component";
import { CadastroPessoaComponent } from "./pessoas/cadastro-pessoa/cadastro-pessoa.component";

  /*  ---Definição das rotas--- */
  // ROLE_CADASTRAR_CATEGORIA, ROLE_PESQUISAR_CATEGORIA
  // ROLE_CADASTRAR_PESSOA, ROLE_REMOVER_PESSOA, ROLE_PESQUISAR_PESSOA
  // ROLE_CADASTRAR_LANCAMENTO, ROLE_REMOVER_LANCAMENTO, ROLE_PESQUISAR_LANCAMENT

  const rotas: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: '', redirectTo: 'painel', pathMatch: 'full' }, /*  pagina inicial  */
    { path: 'acesso-negado', component: AcessoNegadoComponent},
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    { path: '**', redirectTo: 'pagina-nao-encontrada'}  /* qq coisa diferente das rotas configuradas, é redirecionada  */
  ];


@NgModule({
  imports: [ RouterModule.forRoot(rotas) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
