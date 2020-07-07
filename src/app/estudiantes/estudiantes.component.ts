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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(){
    this.getCursos();
    this.paginator._intl.itemsPerPageLabel = 'Cursos por pagina';
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  misCursos = true;
  miPerfil = false;
  registrarCursos = true;
  iniciarGrabacion = true;
  
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
        //console.log(data);
        this.listaCursos = this.listaCursos.response.data;
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




export interface PeriodicElement {
  codigo: string;
  id: number;
  nombre: number;
  creditos: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 2, codigo: 'Helium', nombre: 4.002, creditos: 'He'},
  {id: 3, codigo: 'Lithium', nombre: 6.941, creditos: 'Li'},
  {id: 4, codigo: 'Beryllium', nombre: 9.0122, creditos: 'Be'},
  {id: 5, codigo: 'Boron', nombre: 10.811, creditos: 'B'},
  {id: 6, codigo: 'Carbon', nombre: 12.010, creditos: 'C'},
  {id: 7, codigo: 'Nitrogen', nombre: 14.006, creditos: 'N'},
  {id: 8, codigo: 'Oxygen', nombre: 15.999, creditos: 'O'},
  {id: 9, codigo: 'Fluorine', nombre: 18.998, creditos: 'F'},
  {id: 10, codigo: 'Neon', nombre: 20.179, creditos: 'Ne'},
  {id: 11, codigo: 'Sodium', nombre: 22.989, creditos: 'Na'},
  {id: 12, codigo: 'Magnesium', nombre: 24.305, creditos: 'Mg'},
  {id: 13, codigo: 'Aluminum', nombre: 26.981, creditos: 'Al'},
  {id: 14, codigo: 'Silicon', nombre: 28.085, creditos: 'Si'},
  {id: 15, codigo: 'Phosphorus', nombre: 30.973, creditos: 'P'},
  {id: 16, codigo: 'Sulfur', nombre: 32.065, creditos: 'S'},
  {id: 17, codigo: 'Chlorine', nombre: 35.453, creditos: 'Cl'},
  {id: 18, codigo: 'Argon', nombre: 39.948, creditos: 'Ar'},
  {id: 19, codigo: 'Potassium', nombre: 39.098, creditos: 'K'},
  {id: 20, codigo: 'Calcium', nombre: 40.078, creditos: 'Ca'},
];




