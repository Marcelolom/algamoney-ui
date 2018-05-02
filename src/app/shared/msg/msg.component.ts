import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
/* Antes, tinha q fazer assim:
  <div *ngIf="ctrlDescricao.hasError('required') && ctrlDescricao.dirty" class="ui-message ui-messages-error">
    Campo obrigatório. Informe uma descrição.
  </div>
*/

@Component({
  selector: 'app-msg',
  template: ` <div *ngIf="temErro()" class="ui-message ui-messages-error">
                {{ msg }}
              </div>`,
  styles: [`.ui-messages-error {
              margin: 0;
              margin-top: 2px;
              border-radius: 15px;
            }`]
})
export class MsgComponent {
  @Input() erro: string;          // required, minlength, maxlength, etc
  @Input() controle: FormControl; // variavel de referncia do controle . Ex.: #ctrlNome
  @Input() msg: string;           // texto da mensagem para o erro

  temErro(): boolean {
    //let retorno: boolean = false;
    //let foiMexido: boolean = this.controle.dirty;
    //let houveErro: boolean = this.controle.hasError(this.erro);
    //if (houveErro && foiMexido) {
    //  retorno = true;
    //}
    //return retorno;
    return this.controle.hasError(this.erro) && this.controle.dirty
  }



}
