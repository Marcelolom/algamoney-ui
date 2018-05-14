import { Injectable } from '@angular/core';
import { ResponseContentType, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`; // endereço na api
  }

  //  ------------------------------------------------
  //  API -> /lancamentos/relatorios/por-pessoas * Requer 2 parametros
  //  Gera relaotiro por pessoa
  //  ------------------------------------------------
  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new URLSearchParams();

    // parametros da requisição
    params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params.set('fim', moment(fim).format('YYYY-MM-DD'));

    //Requisição e retorno
    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }

}
