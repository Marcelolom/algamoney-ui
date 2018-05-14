import { AutenticacaoService } from './seguranca/autenticacao.service';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor( private rota: Router,
              private autenticacao: AutenticacaoService) {}

  exibindoNavbar() {
    return this.rota.url !== '/login';
  }

  @HostListener('window:beforeunload',['$event']) public aoFecharBrowser() {
    console.log('clicou fechar browse/aba.........');
    // event.returnValue = true; // se quiser q apareça um dialog de confirmação
    this.autenticacao.limparAccessToken();
  }
}
