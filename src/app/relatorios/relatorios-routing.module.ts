import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacaoGuard } from './../seguranca/autenticacao.guard';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

const routes: Routes = [
  {
    /* localhost:4200/relatorios/lancamentos  */
    path: 'relatorios/lancamentos',
    component: RelatorioLancamentosComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
