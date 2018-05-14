import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment'; // A bibilioteca moment vai tranformar a data informada
import { Moment } from 'moment'; // no formato que a requisição precisa: 2017-12-30

import { Lancamento } from './../core/models';
import { environment } from '../../environments/environment';

//  ------Lançamento filtro ---
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 10; //aqui defino a quant de registro por pagina da table
}
// ----------------------------

@Injectable()
export class LancamentoService {

  //lancamentoURL = 'http://localhost:8080/lancamentos';
  lancamentoURL: string;

  // como estamos usando a biblioteca angular2-jwt , temos q retirar todos os headers, pois
  // a biblioteca insere automaticamnte
  // constructor(private http: Http) { }
  constructor(private http: AuthHttp) {
    this.lancamentoURL = `${environment.apiUrl}/lancamentos`; // ver environments.ts
  }

  // Metodo q retona a url : Utilizado pelo fileupload
  urlUploadAnexo(): string {
    return `${this.lancamentoURL}/anexo`;
  }

  //  -----------------------------------------------
  //  Listar todos lançamentos com resumo (GET)
  //  Recebe como parametro um objeto que pode conter descricao, dataVencimentoDe, dataVencimentoAte
  //  -----------------------------------------------
  listarTodosResumo(filtro: LancamentoFiltro): Promise<any> {
                /* // header
                const myHeaders = new Headers();
                myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                myHeaders.append('Content-Type', 'application/json');*/

    // paramentros de pesquisa da URL. Ttrata os parametros, se houver
    const paramsPesquisa = new URLSearchParams();
    paramsPesquisa.set('page', filtro.pagina.toString());       // params de paginação
    paramsPesquisa.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) { // Se informou descricao
      paramsPesquisa.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) { // Se informou incio
      let inicio: Moment = moment(filtro.dataVencimentoInicio); // Data inicial
      paramsPesquisa.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD")); // formato aceito api

      if (filtro.dataVencimentoFim) {  //  Data final
        let fim: Moment = moment(filtro.dataVencimentoFim);
        // Valida data final. Se menor q a inicial vai desconsiderar a final
        if (fim.diff(inicio) > 0) {
          paramsPesquisa.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
        }
      }
    }

    //  Data final
    if (filtro.dataVencimentoFim) {
      let fim: Moment = moment(filtro.dataVencimentoFim);
      paramsPesquisa.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
    }

    // return this.http.get(`${this.lancamentoURL}?resumo`, { headers: myHeaders, search: paramsPesquisa })
    return this.http.get(`${this.lancamentoURL}?resumo`, { search: paramsPesquisa })
    .toPromise()
    .then(response => {
      const respJson = response.json();
      const respContent = respJson.content; // registros retornados da consulta
      const retorno = { respLancamentos: respContent, total: respJson.totalElements }; // cria objeto
      return retorno; // o retorno cria um objeto e acrescenta o total de elementos
    });
    //.toPromise()
    //.then(response => response.json().content);
  }

  //  ------------------------------------------
  //  Método privado: verifica a dataVencimentoFim > data Inicio
  //  -------------------------------------------
  private isFimValido(filtro: LancamentoFiltro): boolean {
    let inicio: Moment = moment(filtro.dataVencimentoInicio);
    let fim: Moment = moment(filtro.dataVencimentoFim);
    if (fim.diff(inicio) < 0) { //Se fim-inicio < 0
      return false;
    }
    return true;
  }

  // ----------------------------------------------------
  // Excluir (DELETE)
  // --------------------------------------------------
  excluir(codigo: number): Promise<void> {
                /* // header
                const myHeaders = new Headers();
                myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                myHeaders.append('Content-Type', 'application/json'); */

    // Requisição
    // return this.http.delete(`${this.lancamentoURL}/${codigo}`, { headers: myHeaders })
    return this.http.delete(`${this.lancamentoURL}/${codigo}`)
      .toPromise()
      .then(() => null); // delete é sucesso ou não. Não retorna nada
  }

  //  ------------------------------------------------
  //  Incluir (POST)
  //  ------------------------------------------------
  incluir(lancamento: Lancamento): Promise<Lancamento> {
                  /* // header
                  const myHeaders = new Headers();
                  myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                  myHeaders.append('Content-Type', 'application/json'); */

    // Requisição Http.post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    return this.http.post(this.lancamentoURL, JSON.stringify(lancamento))
      .toPromise()
      .then(resposta => resposta.json());
  }

  //  ------------------------------------------------
  //  Atualizar (PUT)
  //  ------------------------------------------------
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Requisição Http.put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    // return this.http.put(`${this.lancamentoURL}/${lancamento.codigo}`, JSON.stringify(lancamento),  { headers: myHeaders })
    return this.http.put(`${this.lancamentoURL}/${lancamento.codigo}`, JSON.stringify(lancamento))
      .toPromise()
      .then(resposta => {
        const lancamentoAlterado = resposta.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado])
        return lancamentoAlterado;
      });
  }

  //  ------------------------------------------------
  //  Buscar por código (GET)
  //  ------------------------------------------------
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json');*/

    // Requisição Http.post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    //return this.http.get(`${this.lancamentoURL}/${codigo}`,  { headers: myHeaders })
    return this.http.get(`${this.lancamentoURL}/${codigo}`)
      .toPromise()
      .then(resposta => {
        const lancamentoRetorno = resposta.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoRetorno])
        return lancamentoRetorno;
      });
  }

  //  ------------------------------------------------
  //  Método privado converte de string para data
  //  ------------------------------------------------
  private converterStringsParaDatas(lancamentos: Lancamento[]): void {
    for (let lancamento of lancamentos) {
      // Converte a data de vencimento: String para data
      lancamento.dataVencimento = moment(lancamento.dataVencimento,'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        // Se houver dataPagto, tbem converte
        lancamento.dataPagamento = moment(lancamento.dataPagamento,'YYYY-MM-DD').toDate();
      }
    }
  }


}
