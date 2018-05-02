import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutService } from './../../seguranca/logout.service';
import { MyErrorHandlerService } from './../my-error-handler.service';
import { AutenticacaoService } from './../../seguranca/autenticacao.service';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent {

  private largura: String = '0px';

  constructor(
    public auth: AutenticacaoService,
    private logoutService: LogoutService,
    private erroService: MyErrorHandlerService,
    private router: Router) { }

  getLargura() {
    return this.largura;
  }

  abrirMenu(): void {
    this.largura = '250px';
  }

  fecharMenu(): void {
    this.largura = '0px';
  }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.erroService.handleError(erro));
  }


}
