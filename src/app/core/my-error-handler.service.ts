import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Response } from '@angular/http';
import { NaoAutenticadoError } from './../seguranca/money-http';
import { Router } from '@angular/router';

@Injectable()
export class MyErrorHandlerService implements ErrorHandler {

  private rota: Router;
  // Gambiarra para resolver o erro de depndencia ciclica
  constructor(private msgService: MessageService, private injector: Injector) { }


  handleError(errorResponse: any, msgTitulo?: string): void {
    let msg:string;   // mensagem de erro que será apresentada

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NaoAutenticadoError) {
      msg = 'Sua sessão expirou.';
      msgTitulo = 'Desculpe';
      this.rota = this.injector.get(Router);
      this.rota.navigate(['/login']); // direcionada para login

    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação.';
      if (errorResponse.status == 404) { // 404 Not found
        msg = 'Registro não encontrado.'
      }
      if (errorResponse.status == 400) { // 400 Bad request
        msg = 'Erro na requisição. Verifique!'
      }

      let errors;

      try {
        errors = errorResponse.json();
        if (errors) {
          msg = errors[0].mensagemUsuario + '.';
          if (errors[0].mensagemProgramador.includes('SqlException')) {
            msg = msg + "O registro pode estar vinculado a outro. Verifique!"
          }
        }
      } catch (e) {
        console.log('erro no try');
        console.log(e);
      }

      console.error('Ocorreu um erro:', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }

    let titulo;
    if (msgTitulo) {
      titulo = msgTitulo;
    } else {
      titulo = 'Erro (status=' + errorResponse.status + ').';
    }

    //this.msgService.add({key:'grl-erro', severity:'error', summary:`Erro (status= ${errorResponse.status})`, detail:`${msg}`});
    this.msgService.add({key:'grl-erro', severity:'error', summary:`${titulo}`, detail:`${msg}`});

  }

}
