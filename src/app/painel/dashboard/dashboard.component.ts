import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';

import { PainelService } from './../painel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pizzaDados:any;
  linhaDados:any;
  arrayTotaisReceitas:number[];
  arrayTotaisDespesas:number[];
  // Opções p/ gráfico Pizza. ver http:/ /www.chartjs.org/docs/latest/configuration/tooltip.html
  opcoesPizza = {
    tooltips : {
      callbacks : {
        label : (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex]; //
          const valor = dataset.data[tooltipItem.index];
          return ' R$ ' + this.decimalPipe.transform(valor,'1.2-2');
        }
      }
    },
    legend : {
      position : 'left',
      labels: {
        boxWidth : 15
      }
    }
  };

  // Opções p/ gráfico Linha. ver http:/ /www.chartjs.org/docs/latest/configuration/tooltip.html
  opcoesLinha = {
    tooltips : {
      callbacks : {
        label : (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label;
          return label + ' R$ ' + this.decimalPipe.transform(valor,'1.2-2');
        },
        title : (tooltipItem, data) => {
          const item = tooltipItem[0];
          return 'Dia: ' + data.labels[item.index];
        }
      }
    },
    legend : {
      position : 'top',
      labels: {
        boxWidth : 20
      }
    }
  };

  constructor(private painelService: PainelService, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.carregarGraficoPizza();
    this.carregarGraficoLinha();
  }

  // -------------------------------------------
  // Método respon´savel por carregar dados
  // Pode ser utilizado no gráfico de pizza(pie) ou rosquinha(Doughnut)
  // -------------------------------------------
  carregarGraficoPizza() { // Serve para DoughnutChart tbem
    this.painelService.totalizarPorCategoria()
      .then(dadosRetorno => {
        this.pizzaDados = {
          labels: dadosRetorno.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dadosRetorno.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
              '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
    /*     Modelo de referencia
      pieChartData = {
      labels: ['Mensal', 'Educação', 'Lazer', 'Imprevistos'], <-- array de strings
      datasets: [
        {
          data: [2500, 2700, 550, 235],
          backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
          // * Se o array cores for menor complementa com cinza
        }
      ]
    }; */
  }

  // -------------------------------------------
  // Método respon´savel por carregar dados para o Gráfico de linhas
  // painelService.totalizarPorDia() converte as datas do tipo string para Date
  // assim , dados de retorno conterá tipo<string>, dia<date> e total<number>
  // -------------------------------------------
  carregarGraficoLinha() { // Serve para DoughnutChart tbem
    this.painelService.totalizarPorDia()
      .then(dadosRetorno => {
        //const arrayDiasDoMes = this.configurarDiasDoMes();
        const qtDiasMes = moment().daysInMonth();
        const arrayDiasDoMes = Array.from({length: qtDiasMes}, (valor, indice) => indice+1); // [1,2,3...30]

        this.totalizarContas(dadosRetorno, qtDiasMes); // atualiza arrayDespesa e arrayReceita

        this.linhaDados = {
          labels: arrayDiasDoMes,
          datasets: [
            {
              label: 'Receita',
              data: this.arrayTotaisReceitas,
              borderColor: '#3366CC',
              pointStyle: 'circle'
            }, {
              label: 'Despesa',
              data: this.arrayTotaisDespesas,
              borderColor: '#D62B00',
              pointStyle: 'rect'
            }
          ]
        };
      });
  }

  // -------------------------------------------
  // Método privado q atualiza os arrays de Receita e Despesa
  // com totais para cada dia do mês corrente, mesmo q o total seja zero
  // -------------------------------------------
  totalizarContas(dados, qtDiasDoMes) {
    // inicializo o array com zeros e do tamanho do mes
    this.arrayTotaisReceitas = new Array(qtDiasDoMes).fill(0);
    this.arrayTotaisDespesas = new Array(qtDiasDoMes).fill(0);

    for (const dado of dados) {
      // Só altero o array onde for necessário
      if (dado.tipo ==='RECEITA') { // Date().getDate() retorna um number com o dia do mes
        this.arrayTotaisReceitas[dado.dia.getDate()-1] = dado.total;
      } else { // Se não for receita será uma despesa...só tem dois tipos
        this.arrayTotaisDespesas[dado.dia.getDate()-1] = dado.total;
      }
    }
  }
}
