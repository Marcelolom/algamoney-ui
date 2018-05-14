import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';

import { SharedModule } from './../shared/shared.module';
import { PesquisaLancamentosComponent } from './pesquisa-lancamentos/pesquisa-lancamentos.component';
import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';
import { LancamentoRoutingModule } from './lancamento-routing.module';

@NgModule({
  imports:
  [
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
    ProgressBarModule,
    ProgressSpinnerModule,
    FileUploadModule,

    SharedModule,
    LancamentoRoutingModule
  ],
  declarations: [
    CadastroLancamentoComponent,
    PesquisaLancamentosComponent
  ],
  exports: []
})

export class LancamentosModule { }
