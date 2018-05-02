
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt'; //https: //www.npmjs.com/package/angular2-jwt

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { LoginFormComponent } from './login-form/login-form.component';

// a biblioteca angular2-jwt insere automaticamente nas requisicoes http
// um body com tudo q é necessa´rio . Ex. inclui Bearer token, etc
import { LogoutService } from './logout.service';
import { AutenticacaoGuard } from './autenticacao.guard';
import { AutenticacaoService } from './autenticacao.service';
import { MoneyHttp } from './money-http';
import { RouterModule } from '@angular/router';

export function authHttpServiceFactory(auth:AutenticacaoService ,http: Http, options: RequestOptions) {
  const configuracao = new AuthConfig({
    tokenName:'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-type': 'application/json'}]
  });
  return new MoneyHttp(auth, configuracao, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AutenticacaoService , Http, RequestOptions]
    },
    AutenticacaoGuard,
    LogoutService
  ]
})

export class SegurancaModule { }
