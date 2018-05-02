/*
 Coloquei todos modelos em um unico arquivo, mas poderaqi ter criado uma pasta
 modelos e criar um arquivo para cada modelo
*/
export class Categoria {
  codigo: number;
  descricao: string;
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number; // basta o codigo
  nome: string;
  ativo: boolean;
  endereco = new Endereco();
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA'; // inicializa como receita
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
