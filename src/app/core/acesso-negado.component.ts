import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso-negado',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso negado!</h1>
    </div>
  `,
  styles: []
})

// Esse componente trabalha juntamente com o canactive do autenticacao.guard
export class AcessoNegadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
