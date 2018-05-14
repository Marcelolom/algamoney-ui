import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Contato } from './../../core/models';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  // ----------------------------
  // Propriedades
  // ----------------------------
  @Input() contatos: Array<Contato>;
  contato: Contato;
  exibindoFormularioContato = false;
  indiceContato: number;

  // ----------------------------
  // Construtor
  // ----------------------------
  constructor(private msgService: MessageService) {}

  // -----------------------------------------------
  // Método responsavel por exibir um dialogo de novo contato
  // -----------------------------------------------
  prepararNovoContato() {
    this.contato = new Contato();
    this.indiceContato = this.contatos.length;
    this.exibindoFormularioContato = true;
  }

  // -----------------------------------------------
  // Método responsavel por exibir um dialogo de novo contato
  // -----------------------------------------------
  prepararEdicaoContato(paramContato: Contato, indice: number) {
    this.contato = this.clonarContato(paramContato);
    this.indiceContato = indice;
    this.exibindoFormularioContato = true;
  }

  // -----------------------------------------------
  // Método responsavel por confirmar um contato e incluir no table de contatos
  // -----------------------------------------------
  confirmarContato(form: FormControl) {
    // Aqui o problema é o reset do form. Foi preciso criar um contato auxiliar para não perder a referencia
    // ao objeto contato da view. No reset zerava tudo inclusive o contato da view.
    // agora incluo na tabela não o contato da view , mas sua copia
    this.contatos[this.indiceContato] = this.clonarContato(this.contato);
    //this.pessoa.contatos.push(this.clonarContato(this.contato));

    form.reset();
    this.exibindoFormularioContato = false;

    this.msgService.add({severity:'warn', summary:'Ok!', detail:'Contato confirmado. Não esqueça de salvar.'});
  }

  // -----------------------------------------------
  // Método responsavel por remover um contato da table de contatos
  // -----------------------------------------------
  removerContato(indice: number) {
    this.contatos.splice(indice, 1); // remove 1 elemento da posicao indice
    this.msgService.add({severity:'warn', summary:'Ok!', detail:'Contato removido. Não esqueça de salvar.'});
  }

  // ------------------------------------------
  // Método privado Clonar o contato
  // ------------------------------------------
  clonarContato(c: Contato): Contato {
    let contatoCopia:Contato = new Contato();
    contatoCopia.codigo = c.codigo;
    contatoCopia.nome = c.nome;
    contatoCopia.email = c.email;
    contatoCopia.telefone = c.telefone;

    return contatoCopia;
  }

  // ------------------------------------------
  // Método utilizado para o titulo da dialog
  // ------------------------------------------
  get editando() {
    //if (this.contato.codigo == null) return false else return true
    return this.contato.codigo;
  }

}
