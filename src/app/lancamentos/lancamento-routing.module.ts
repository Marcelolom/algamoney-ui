import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PesquisaLancamentosComponent } from "./pesquisa-lancamentos/pesquisa-lancamentos.component";
import { AutenticacaoGuard } from "./../seguranca/autenticacao.guard";
import { CadastroLancamentoComponent } from "./cadastro-lancamento/cadastro-lancamento.component";

/*  ---Definição das rotas--- */
// ROLE_CADASTRAR_CATEGORIA, ROLE_PESQUISAR_CATEGORIA
// ROLE_CADASTRAR_PESSOA, ROLE_REMOVER_PESSOA, ROLE_PESQUISAR_PESSOA
// ROLE_CADASTRAR_LANCAMENTO, ROLE_REMOVER_LANCAMENTO, ROLE_PESQUISAR_LANCAMENT

const rotas: Routes = [
  {
    /* localhost:4200/lancamentos -> Pesquisa Lancamentos */
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
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rotas) ],
  exports: [ RouterModule ]
})

export class LancamentoRoutingModule { }
