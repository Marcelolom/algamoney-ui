
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { JwtHelper } from 'angular2-jwt';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";

import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { MyErrorHandlerService } from './my-error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { CategoriaService } from './../categorias/categoria.service';
import { AutenticacaoService } from './../seguranca/autenticacao.service';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { PainelService } from './../painel/painel.service';

import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AcessoNegadoComponent } from './acesso-negado.component';

//  --- Para registra locale pt-BR
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

// Configuração global do CurrencyMaskMoney
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [ BarraNavegacaoComponent, PaginaNaoEncontradaComponent, AcessoNegadoComponent ],
  exports: [
    BarraNavegacaoComponent,
    GrowlModule,
    ConfirmDialogModule,
    PaginaNaoEncontradaComponent,
    AcessoNegadoComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: ErrorHandler, useClass: MyErrorHandlerService },
    MessageService,
    ConfirmationService,
    MyErrorHandlerService,
    LancamentoService,
    PessoasService,
    CategoriaService,
    RelatoriosService,
    Title,
    AutenticacaoService,
    PainelService,
    JwtHelper
  ]
})
export class CoreModule { }
