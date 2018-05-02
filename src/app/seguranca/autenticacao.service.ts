
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { JwtHelper } from 'angular2-jwt';
import { MyErrorHandlerService } from '../core/my-error-handler.service';
import { environment } from '../../environments/environment';

/* Para saber mais:
      https://pt.stackoverflow.com/questions/100335/performance-com-multipart-form-data
      https://pt.stackoverflow.com/questions/103157/qual-%C3%A9-a-diferen%C3%A7a-entre-x-www-form-urlencoded-e-form-data
*/

@Injectable()
export class AutenticacaoService {
  // ----------------------------------------------
  // Propriedades
  // ----------------------------------------------
  //tokenUrl = 'http://localhost:8080/oauth/token';
  tokenUrl: string;
  jwtPayload: any; // O payload é uma das 3 partes do jwtToken
  rfshToken: string;

  // ----------------------------------------------
  // Construtor
  // ----------------------------------------------
  constructor(private http: Http, private jwtService: JwtHelper) {
    this.tokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  // -------------------------------------------------
  // Logar (//localhost:8080/oauth/token) (POST)
  // -------------------------------------------------
  logar(usuario: string, senha: string): Promise<void> {
    /*  A api foi criado com um usuario/senha de aplicação (angular, ang1234). Apos codificado vira ->Basic YW5ndWxhcjphbmcxMjM0   */
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', 'Basic YW5ndWxhcjphbmcxMjM0'); //Username=angular; Password=ang1234 (antes da codificação)


    /* Dentro do corpo tem outro username/password, mas agora do usuário. Tbem o grant type que é fixo=password*/
    const body = `username=${usuario}&password=${senha}&grant_type=password`;// O '&' separa as propriedades

    // Http.post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
    // Para decodificar o JWT será preciso essa biblioteca : https:  //github.com/auth0/angular2-jwt/tree/pre-v1.0 (ver)
    // Apos isso, inclui o o jwtHelperService no core para ficar disp para toda app
    //return this.http.post(this.tokenUrl, body, {headers: myHeaders, withCredentials: true}).toPromise()
    return this.http.post(this.tokenUrl, body, {headers: myHeaders, withCredentials: true})
      .toPromise()
      .then(respostaOk => {
        //console.log(respostaOk);
              //console.log('imprindo header');
              //console.log(respostaOk.headers.get('Set-Cookie'));
              //var headers = respostaOk.headers; header['Set-Cookie']
              //var setCookieHeader = headers.get('Set-Cookie');
              //console.log(setCookieHeader);
        this.armazenarToken(respostaOk.json().access_token);
        //console.log(respostaOk.json().access_token);
      })
      .catch(respostaErro => {
        return Promise.reject(respostaErro)
      });
  }

  // ----------------------------------------------
  // Gerar novo acess token (parecido com o metodo logar)
  // ----------------------------------------------
  obterNovoAccessToken(): Promise<void> {
    const myHeaders = new Headers(); //Header
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', 'Basic YW5ndWxhcjphbmcxMjM0');
    myHeaders.append('Accept', 'application/json');

    const body = 'grant_type=refresh_token';  // Body

    //return this.http.post(this.tokenUrl, body,  { headers: myHeaders })
    return this.http.post(this.tokenUrl, body,  { headers: myHeaders, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
        console.log('Novo access token criado!');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }


  // ----------------------------------------------
  // Armazena Token recebido
  // ----------------------------------------------
  private armazenarToken(pToken: string) {
    this.jwtPayload = this.jwtService.decodeToken(pToken);
    //console.log('Payload');
    //console.log(this.jwtPayload);
    localStorage.setItem('token', pToken); // armazena codificado

    //const decodedToken = this.jwtService.decodeToken(pToken);
    //const expirationDate = this.jwtService.getTokenExpirationDate(pToken);
    //const isExpired = this.jwtService..isTokenExpired(pToken);
    //const url64 = this.jwtService.urlBase64Decode(string qualuer)
  }

  // ----------------------------------------------
  // Carrega Token, se houver
  // ----------------------------------------------
  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      //this.armazenarToken(token);
      this.jwtPayload = this.jwtService.decodeToken(token);
    }
  }

  // ----------------------------------------------
  // Verifica se o token já expirou
  // ----------------------------------------------
  isTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtService.isTokenExpired(token);
  }

  // ----------------------------------------------
  // Verifica se tem permissao passado no paramnetro
  // ROLE_CADASTRAR_CATEGORIA, ROLE_PESQUISAR_CATEGORIA
  // ROLE_CADASTRAR_PESSOA, ROLE_REMOVER_PESSOA, ROLE_PESQUISAR_PESSOA
  // ROLE_CADASTRAR_LANCAMENTO, ROLE_REMOVER_LANCAMENTO, ROLE_PESQUISAR_LANCAMENTO
  // ----------------------------------------------
  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  // ----------------------------------------------
  // Verifica se tem qq uma das permissoes que permissao passadas no paramnetro
  // ----------------------------------------------
  temQualquerUmaDasPermissoes(permissoes) {
    for (let role of permissoes) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  // ----------------------------------------------
  // Logout. Limpa o token e payload jwt
  // ----------------------------------------------
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }


}
