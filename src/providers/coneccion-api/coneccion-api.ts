import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConeccionApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConeccionApiProvider {
  private headers = new HttpHeaders();
  private url:string = "https://jsonplaceholder.typicode.com/"
  constructor(public http: HttpClient) {
    console.log('Hello ConeccionApiProvider Provider');
    this.headers.append('Content-Type','application/json');
  }
  /**
   * Metodo para recuperar los registros de la api si el parametro llega null recupera todos
   */
  obtenerTodos(){
    let url :string =`${this.url}todos/`
    return this.http.get(url,{headers : this.headers})
  }

  /**
   * Metodo para recuperar los posts de la api 
   */
  obtenerPosts(){
    let url :string =`${this.url}posts`
    return this.http.get(url,{headers : this.headers})
  }
  /**
   * Recupera el post especificado
   * @param idPost id del post a recuperar
   */
  obtenerPostsPorId(idPost:number){
    let url :string =`${this.url}posts/${idPost}`
    return this.http.get(url,{headers : this.headers})
  }

}
