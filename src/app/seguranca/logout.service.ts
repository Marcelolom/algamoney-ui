import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { AutenticacaoService } from './autenticacao.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LogoutService {

  //tokensRenokeUrl = 'http://localhost:8080/tokens/revogar';
  tokensRevogaUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AutenticacaoService
  ) {
    this.tokensRevogaUrl = `${environment.apiUrl}/tokens/revogar`;
  }

  logout() {
    return this.http.delete(this.tokensRevogaUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
