import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-tabela-pessoas',
  templateUrl: './tabela-pessoas.component.html',
  styleUrls: ['./tabela-pessoas.component.css']
})
export class TabelaPessoasComponent{

  @Input() pessoas = [];
  @Input() linhasPorPagina;
  @Input() totalDeRegistros;
  @Output() aoPaginar = new EventEmitter<LazyLoadEvent>(); // emissor de evento

  aoMudarPagina(evento: LazyLoadEvent) {
    this.aoPaginar.emit(evento); // dispara evento no componente pai
    //in a real application, make a remote request to load data using state metadata from event
    //console.log(evento);
    //event.first = primeiro linha do conjunto de dados. 0-primeiro, 1-segundo, etc
    //event.rows = Numero de linhas por pagina
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
  }

}
