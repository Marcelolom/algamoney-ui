import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from './../shared/shared.module';
import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { ContatoComponent } from './contato/contato.component';

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
    FieldsetModule,
    InputMaskModule,
    CurrencyMaskModule,
    DialogModule,

    SharedModule,
    PessoasRoutingModule
  ],
  declarations: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent,
    ContatoComponent
  ],
  exports: []
})

export class PessoasModule { }
