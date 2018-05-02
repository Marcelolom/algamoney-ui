import { Component, Input, OnChanges, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-tabela-lancamentos',
  templateUrl: './tabela-lancamentos.component.html',
  styleUrls: ['./tabela-lancamentos.component.css']
})
export class TabelaLancamentosComponent {

  @Input() lancamentos = [];
  @Input() linhasPorPagina;
  @Input() totalDeRegistros;
  @Output() aoPaginar = new EventEmitter<LazyLoadEvent>(); // emissor de evento

  aoMudarPagina(evento: LazyLoadEvent) {
    this.aoPaginar.emit(evento);
    //in a real application, make a remote request to load data using state metadata from event
    //console.log(evento);
    //event.first = primeiro linha do conjunto de dados. 0-primeiro, 1-segundo, etc
    //event.rows = Numero de linhas por pagina
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
  }


  // Para utilizar implemnte OnChanges
  /*
  ngOnChanges(changes: SimpleChanges): void {
    let tamanho = this.lancamentos.length;
    //console.log("Mudou. Tamanho=" + tamanho);
    console.log("--------------tamanho = " + tamanho);

    for (let property in changes) {
      if (property === 'lancamentos') {
        console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
        this.lancamentos = changes[property].currentValue;
      }
    }
  }*/


}
