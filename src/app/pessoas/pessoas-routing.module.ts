import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { AutenticacaoGuard } from "./../seguranca/autenticacao.guard";

const rotas: Routes = [
  {
  /*  GET 4200:/pessoas  */
  path: 'pessoas',
  component: PesquisaPessoasComponent,
  canActivate: [AutenticacaoGuard],
  data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  { /*  POST 4200:/pessoas/nova  */
    path: 'pessoas/nova',
    component: CadastroPessoaComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  { /*  PUT 4200:/pessoas/2  */
    path: 'pessoas/:codPessoa',
    component: CadastroPessoaComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
