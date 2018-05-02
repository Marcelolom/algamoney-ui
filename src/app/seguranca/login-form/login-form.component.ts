import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AutenticacaoService } from './../autenticacao.service';
import { MyErrorHandlerService } from '../../core/my-error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  // ----------------------------------------------
  // Propriedades
  // ----------------------------------------------
  @ViewChild('ctrlSenha') campoSenha: ElementRef;

  // ----------------------------------------------
  // Construtor
  // ----------------------------------------------
  constructor(
    private autenticacaoService: AutenticacaoService,
    private erroService: MyErrorHandlerService,
    private rota: Router) { }

  // ----------------------------------------------
  // OnInit
  // ----------------------------------------------
  ngOnInit() { }

  // ----------------------------------------------
  // Fazer Login
  // ----------------------------------------------
  fazerLogin(usuario: string, senha: string) {
    this.autenticacaoService.logar(usuario, senha)
    .then(() => {
      console.log('Tudo ok.');
      this.rota.navigate(['/lancamentos']);
    })
    .catch(erro => {
      this.campoSenha.nativeElement.focus(); // foco na senha
      if (erro.status === 400) {
        const respJson = erro.json();
        if (respJson.error === 'invalid_grant') { // aqui entra somente se inavlid-grant
          return this.erroService.handleError('Usuário e/ou senha inválidos.', 'Acesso negado. (status=400)');
        }
      }
      // Caso nao retorne pelo invalid_grant
      return this.erroService.handleError(erro);
    });
  }
}
