import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from './../shared/shared.module';
import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';

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
    FieldsetModule,
    InputMaskModule,
    CurrencyMaskModule,
    SharedModule
  ],
  declarations: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent
  ],
  exports: [
    /* Só era necessário qdo estava usando o componente no app.componente.html.
        Com os redirecionamentos pode apagar
    CadastroPessoaComponent,
    PesquisaPessoasComponent*/
  ]
})
export class PessoasModule { }
