import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { DataService } from '../data.service';
import {Subscription} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
  import { MatSelect } from '@angular/material/select';
import { stringify } from 'querystring';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})


export class EstudiantesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  listaCursosE;
  listaCursos;
  listaProfesores;
  nameuser=null;
  pass=null;
  nombreC=null;
  codigoC=null;
  creditosC=null;
  serverRes
  carne="0504200129";
  numGrupo=50;
  idProfesor;
  idCurso;
  idEstudiante=1;
  private curso;
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
    this.getProfesores();
    this.getCursosEstudiante();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  @ViewChild('matProfesor') matProfesor: MatSelect;
  @ViewChild('matCurso') matCurso: MatSelect;
       //Reference Variable //variable Name //Type

  ngAfterViewInit() {
      this.matProfesor.valueChange.subscribe(value => {
          this.idProfesor=value;
      });
      this.matCurso.valueChange.subscribe(value => {
        this.idCurso=value;
      });
  }
  misCursos = true;
  miPerfil = false;
  registrarCursos = true;
  iniciarGrabacion = true;
  siguiente = false;
  changeClient(value) {
    console.log(value);
  }
  siguienteF(){
    if(this.siguiente==true){
      this.siguiente=false;
    }else{
      this.siguiente=true;
    }
  }
  insertarCursos(listaCursosE){
    for(let i in listaCursosE){
      ELEMENT_DATA.push(listaCursosE[i])
    }
    
  }
  private sesion;
  modificar(){
    this.sesion = {"username":"jaffo98","password":"123"}
    this.subscription.add(this.dataService.iniciarSesion(this.sesion).subscribe(///aaa
      data => {
        console.log(data);
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
  registrarCurso(){
    this.curso ={professor_id: this.idProfesor,course_id: this.idCurso,student_id: this.idEstudiante,group_number: this.numGrupo};
    console.log("sss",this.curso);
    this.subscription.add(this.dataService.registrarCurso(this.curso).subscribe(///aaa
      data => {
        this.serverRes = data;
        this.serverRes = this.serverRes.response;
        console.log(this.serverRes);
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
        this.paginator._intl.itemsPerPageLabel = 'Curso por pagina';
        this.dataSource.paginator = this.paginator;
        console.log("cursos",this.listaCursos);

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
  getCursosEstudiante(){
    this.subscription.add(this.dataService.getCursosEstudiate(this.carne).subscribe(///aaa
      data => {
        this.listaCursosE = data;
        this.listaCursosE = this.listaCursosE.response;
        this.insertarCursos(this.listaCursosE);
        this.paginator._intl.itemsPerPageLabel = 'Curso por pagina';
        this.dataSource.paginator = this.paginator;
        console.log("CURSOS ES",this.listaCursosE);

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
  getProfesores(){
    this.subscription.add(this.dataService.getProfesors().subscribe(///aaa
      data => {
        this.listaProfesores = data;
        this.listaProfesores = this.listaProfesores.response;
        console.log("Profesores",this.listaProfesores);

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




