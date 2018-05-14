import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AutenticacaoGuard } from './../seguranca/autenticacao.guard';

const routes: Routes = [
  {
    /* localhost:4200/painels -> Dashboard */
    path: 'painel',
    component: DashboardComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PainelRoutingModule { }
