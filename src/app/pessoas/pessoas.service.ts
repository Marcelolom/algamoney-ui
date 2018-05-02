import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { Pessoa } from './../core/models';
import { environment } from '../../environments/environment';

//   --------- Pessoa Filtro : aqui defino todos os parametros possiveis na consulta de pessoas
export class PessoaFiltro {
  nome: string;
  pagina = 0;          //localhost:8080/pessoas?nome=ma&page=0&size=5
  itensPorPagina = 6;
} //   ----------------------------------------------------------------------------

@Injectable()
export class PessoasService {
  //pessoasUrl = 'http://localhost:8080/pessoas'; // url basica de pesquisa
  pessoasUrl:string;

  // como estamos usando a biblioteca angular2-jwt , temos q retirar todos os headers, pois
  // a biblioteca insere automaticamnte
  // constructor(private http: Http) { }
  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  // Esse método faz uma requisção usando paramentros de pesquisa
  listarPessoasComFiltro(filtro: PessoaFiltro) {  //recebe filtro como parametro
    /* // Cria a header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // paramentros de pesquisa da URL. Ttrata os parametros, se houver
    const paramsPesquisa = new URLSearchParams();
    paramsPesquisa.set('page', filtro.pagina.toString());
    paramsPesquisa.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      paramsPesquisa.set('nome', filtro.nome);
    }


    // Faz a requisição e retorna
    //return this.http.get(`${this.pessoasUrl}?`, { headers: myHeaders, search: paramsPesquisa })
    return this.http.get(`${this.pessoasUrl}?`, { search: paramsPesquisa })
      .toPromise()
      .then(response => {
          const respJson = response.json();
          const respContent = respJson.content; // registros retornados da consulta
          const retorno = { respPessoas: respContent, total: respJson.totalElements };  // content, total
          return retorno; // o retorno cria um objeto e acrescenta o total de elementos
      });
  }

  // Esse metodo faz uma requisição sem parametros de consulta
  // Esse tipo de consulta não é recomendado para base de dados grande. Retorno tudo.
  listarPessoas(): Promise<any> {
    /* // Cria a header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Faz a requisição e retorna
    // return this.http.get(this.pessoasUrl, { headers: myHeaders })
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
      /* MUITA ATENÇÃO****: eu tinha colocado assim response => { response.json().content } , perceba o parenteses
       Dai ficou dando pau. Não retornava nada. Isso porque qdo coloca parenteses obrigtoriamnte tem que colocar
       um return, pois é uma função e deve rtornar algo ao response*/
  }

  // ----------------------------------------------------
  // Incluir (POST)
  // --------------------------------------------------
  incluir(pessoa: Pessoa): Promise<Pessoa> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Requisição Http.post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    //return this.http.post(this.pessoasUrl, JSON.stringify(pessoa),  { headers: myHeaders })
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(resposta => resposta.json());
  }

  // --------------------------------------------------
  //  Excluir (DELETE)
  // --------------------------------------------------
  excluir(codigo: number): Promise<void> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Requisição
    // Http.delete(url: string, options?: RequestOptionsArgs): Observable<Response>
    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers: myHeaders })
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null); // delete é sucesso ou não. Não retorna nada
  }

  // --------------------------------------------------
  //  Atualizat status (PUT)
  // --------------------------------------------------
  atualizarStatus(codigo: number, novoStatus: Boolean): Promise<void> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Requisição: tem q colocar a palavra ativo na requisção e passar o valor apos a virgula
    // Http.put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    // O segundo parametro body é valor que quer alterar
    // return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, novoStatus,  { headers: myHeaders })
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, novoStatus)
    .toPromise()
    .then(() => null); // put não retorna conteudo
  }

  //  ------------------------------------------------
  //  Buscar por código (GET)
  //  ------------------------------------------------
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Requisição Http.post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    // return this.http.get(`${this.pessoasUrl}/${codigo}`,  { headers: myHeaders })
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(resposta => {
        const pessoaRetorno = resposta.json() as Pessoa;
        return pessoaRetorno;
      });
  }

  //  ------------------------------------------------
  //  Atualizar (PUT)
  //  ------------------------------------------------
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    /* // header
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    myHeaders.append('Content-Type', 'application/json'); */

    // Requisição Http.put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    // return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa),  { headers: myHeaders })
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(resposta => {
        const pessoaAlterada = resposta.json() as Pessoa;
        return pessoaAlterada;
      });
  }


}
