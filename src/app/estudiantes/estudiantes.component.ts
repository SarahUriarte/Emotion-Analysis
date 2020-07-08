import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { DataService } from '../data.service';
import {Subscription} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})


export class EstudiantesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private listaCursos;
  @Input() showResponse: Array<any>;
  @Output() passRender : EventEmitter<boolean>;
 
  constructor(private dataService:DataService) {
    this.passRender = new EventEmitter();
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<cursos>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   ngOnInit(){
    this.getCursos();
    
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  misCursos = true;
  miPerfil = false;
  registrarCursos = true;
  iniciarGrabacion = true;
  insertarCursos(listaCursos){
    for(let i in listaCursos){
      ELEMENT_DATA.push(listaCursos[i])
    }
    
  }
  changeView(valor) {
    if ( valor == 0) {
      this.misCursos = true;
      this.iniciarGrabacion = true;
      this.registrarCursos = true;
      this.miPerfil = false;
    }
    if (valor == 1) {
      this.misCursos = false;
      this.iniciarGrabacion = true;
      this.registrarCursos = true;
      this.miPerfil = true;
    }
    if (valor == 2 ) {
      this.misCursos = true;
      this.iniciarGrabacion = true;
      this.registrarCursos = false;
      this.miPerfil = true;
    }
    if ( valor == 3 ) {
      this.misCursos = true;
      this.iniciarGrabacion = false;
      this.registrarCursos = true;
      this.miPerfil = true;
    }
  }
  getCursos(){
    this.subscription.add(this.dataService.getCursos().subscribe(///aaa
      data => {
        this.listaCursos = data;
        this.listaCursos = this.listaCursos.response;
        this.insertarCursos(this.listaCursos);
        this.paginator._intl.itemsPerPageLabel = 'Curso por pagina';
        this.dataSource.paginator = this.paginator;
        console.log(this.listaCursos);

      },
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error) {
          console.log('Error del lado del cliente')
        }else {
          console.log('Error del lado del servidor')
        }
      }
    ));
    
  }
  

}




export interface cursos {
  codigo: string;
  id: number;
  nombre: string;
  creditos: number;
}
var ELEMENT_DATA: cursos[] = [];




