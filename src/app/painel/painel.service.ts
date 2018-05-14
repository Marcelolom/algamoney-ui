import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class PainelService {

  lancamentoURL: string; //lancamentoURL = 'http://localhost:8080/lancamentos';

  // --------------------------------------
  // --------- Construtor
  // --------------------------------------
  constructor(private http: AuthHttp) {
    this.lancamentoURL = `${environment.apiUrl}/lancamentos`; // ver environments.ts
  }

  // --------------------------------------
  // GET localhost:8080/lancamentos/totalizar/por-categoria (*mes corrente)
  // Retorna um List<LancamentosPorCategoria> onde o obj tem Categoria e total
  // --------------------------------------
  totalizarPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentoURL}/totalizar/por-categoria`)
    .toPromise()
    .then(response => response.json()); // converte o retorno p/ json
  }

  // --------------------------------------
  // GET localhost:8080/lancamentos/totalizar/por-dia (*mes corrente)
  // Retorna um List<LancamentosPorDia> que tem tipo, dia e total
  // --------------------------------------
  totalizarPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentoURL}/totalizar/por-dia`)
    .toPromise()
    .then(response => {
      const dados = response.json();
      // O dia virá do serviodr como string
      this.converterStringsParaDatas(dados);

      return dados;
    });
  }

  // --------------------------------------
  // Método privado. Não retona nada porque usa o parametro como referencia
  // --------------------------------------
  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
              // moment(<data String>, <formato>)
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }


}
