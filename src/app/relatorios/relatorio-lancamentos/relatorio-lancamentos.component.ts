import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})

export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatorioService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    console.log('Iniciado relatorio');
    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        console.log('relatorio parece q foi gerado');
        const url = window.URL.createObjectURL(relatorio);
        console.log('url criada......' + url);

        window.open(url);
      });
  }

}
