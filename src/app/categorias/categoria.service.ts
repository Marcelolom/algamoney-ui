import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment'; // produção ou não

@Injectable()
export class CategoriaService {

  //categoriasURL = 'http://localhost:8080/categorias';
  categoriasUrl: string;

  // como estamos usando a biblioteca angular2-jwt , temos q retirar todos os headers, pois
  // a biblioteca insere automaticamnte
  // constructor(private http: Http) { }
  constructor(private http: AuthHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
                /* // header
                const myHeaders = new Headers();
                myHeaders.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                myHeaders.append('Content-Type', 'application/json'); */

    // Requisição
    //return this.http.get(`${this.categoriasURL}`, { headers: myHeaders })
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(resposta => resposta.json()); // na API esse GET é não paginado. Não retorna content.
  }
}
