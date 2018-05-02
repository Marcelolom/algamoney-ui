import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-teste-ngmodel',
  templateUrl: './teste-ngmodel.component.html',
  styleUrls: ['./teste-ngmodel.component.css']
})
export class TesteNgmodelComponent {
  listaProfissoes = ['Engenheiro','Médico','Motorista','Contador'];
  profissaoSelecionada = 'Contador';

  salvar(formulario: NgForm) {
    console.log(formulario);
    console.log(formulario.value.txtNome);
  }

}
