import { MyErrorHandlerService } from './../core/my-error-handler.service';
import { Injectable, ErrorHandler } from '@angular/core';

import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AutenticacaoService } from './autenticacao.service';

// -------------------------
// Cçasse criada para gerar um erro de autenticaçãoq sera tratada em my-error-handler
// Poderia tratar a classe AuthHttpError, porém problemas no typescript.
export class NaoAutenticadoError {}


@Injectable()
export class MoneyHttp extends AuthHttp {

  constructor(
    private auth: AutenticacaoService,
    options: AuthConfig,
    http: Http,
    defOpts?: RequestOptions
  ) {
    super(options, http, defOpts);
  }

  // -------------------------
  // Em todos, Antes de fazer as requisições, irá fazer uma checagem
  // com o metodo fazerRequisicao
  // -------------------------
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.patch(url, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.options(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.put(url, body, options));
  }

  // ----------------------
  // Faz checagem antes de fazer qq tipo de requisição
  // ----------------------
  private fazerRequisicao(fn: Function): Observable<Response> {
    if (this.auth.isTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. ...');
      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
      .then(() => {
        if (this.auth.isTokenInvalido()) {
          throw new NaoAutenticadoError();
        }
        return fn().toPromise();
      });
      return Observable.fromPromise(chamadaNovoAccessToken);
      //return fn();
    } else { // Se esta valido

      return fn();
    }
  }

}
