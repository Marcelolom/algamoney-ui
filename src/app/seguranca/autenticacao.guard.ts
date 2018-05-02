import { AutenticacaoService } from './autenticacao.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// deve ser incluido em todas as rotas

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  constructor(
    private auth: AutenticacaoService,
    private router: Router
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isTokenInvalido()) {
        console.log('Navegação com access token inválido. Obtendo novo token...');

        return this.auth.obterNovoAccessToken()
          .then(() => {
            // Se token ivalido
            if (this.auth.isTokenInvalido()) {
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          });
      } else if (next.data.roles && !this.auth.temQualquerUmaDasPermissoes(next.data.roles)) {
        this.router.navigate(['/acesso-negado']);
        return false;
      }

    return true; // true->navegação ok; false->acesso negado
  }
}
