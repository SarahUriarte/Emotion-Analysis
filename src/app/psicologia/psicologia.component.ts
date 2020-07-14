import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../data.service';
export interface PeriodicElement {
  emocion: string;
  curso: string;
  fecha: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-psicologia',
  templateUrl: './psicologia.component.html',
  styleUrls: ['./psicologia.component.css']
})
export class PsicologiaComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['emocion', 'curso', 'fecha'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  private listaCursos;
  @Input() showResponse: Array<any>;
  @Output() passRender : EventEmitter<boolean>;
  constructor(private dataService:DataService) { 
    this.passRender = new EventEmitter();
  }

  ngOnInit(): void {
  }

  async getEmotions(){
    var id = (<HTMLInputElement>document.getElementById("search")).value;
    await this.subscription.add(this.dataService.getEmociones(id).subscribe(///aaa
      data => {
        this.listaCursos = data;
        this.listaCursos = this.listaCursos.response;
        console.log("Todo el response",this.listaCursos);
        for (let emo in this.listaCursos){
          console.log(emo)
          ELEMENT_DATA.push(this.listaCursos[emo])
        }
        console.log("Element Data",ELEMENT_DATA)
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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

export interface atributes{
  emotion: string;
  course: string;
  date: string;
}

const datos: atributes[] = [
  {emotion: "Feliz", course:'IA', date: '1029-05-09'},

]
