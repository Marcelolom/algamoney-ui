import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { ProgressBarModule } from 'primeng/components/progressbar/progressbar';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from './../shared/shared.module';
import { PesquisaLancamentosComponent } from './pesquisa-lancamentos/pesquisa-lancamentos.component';
import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputSwitchModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    CurrencyMaskModule,
    SharedModule,
    ProgressBarModule,
    ProgressSpinnerModule
  ],
  declarations: [
    CadastroLancamentoComponent,
    PesquisaLancamentosComponent
  ],
  exports: [
    /*  Só era necessário qdo estava usando o componente no app.componente.html.
        Com os redirecionamentos pode apagar
    CadastroLancamentoComponent,
    PesquisaLancamentosComponent*/
  ]
})

export class LancamentosModule { }
