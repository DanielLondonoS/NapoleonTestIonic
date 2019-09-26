import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModeloApi } from '../../Models/modelo-api';
import { empty } from 'rxjs/Observer';
import { ConeccionApiProvider } from '../../providers/coneccion-api/coneccion-api';
import { ModeloPost } from '../../Models/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private listaRegistros:ModeloPost[] = [];
  private listaRegistroTodos:ModeloPost[] = [];
  private cantRegistros:number = 20;
  private cargoDatos:boolean = false;
  constructor(public navCtrl: NavController,private coneccionApi:ConeccionApiProvider) {
    this.cargarDatosApi()
  }

  cargarDatosApi(){
    // if(!this.cargoDatos){
      this.coneccionApi.obtenerPosts()
      .subscribe((resultado:ModeloPost[]) => {
        this.cargoDatos = true;
        // this.cantRegistros = 20;
        this.listaRegistroTodos = resultado;
        this.actualizarLista();
        
        //this.listaRegistros.push(resultado)
      },error => {
        this.cargoDatos = false;
        console.log(error);
      })
    // }else{
    //   this.actualizarLista(true);
    // }
    
  }

  actualizarLista(){
    let registrosActual : number = this.cantRegistros == 20? 0 : this.cantRegistros;
    if(registrosActual > 20){
      this.cantRegistros = this.cantRegistros + 20;
    }

    if(this.cantRegistros > this.listaRegistroTodos.length){
      this.cantRegistros = this.listaRegistroTodos.length
    }
        
    for( let x = registrosActual; x < this.cantRegistros ; x++){
      this.listaRegistros.push(this.listaRegistroTodos[x])
    }
    // this.listaRegistros.push(registros);
    this.cantRegistros = this.listaRegistros.length + 1
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if(this.cantRegistros < this.listaRegistroTodos.length){
      setTimeout(() => {
        // for (let i = 0; i < 30; i++) {
        //   this.listaRegistros.push(  );
        // }
        this.actualizarLista();
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    }else{
      infiniteScroll.complete();
    }

    
  }

}
