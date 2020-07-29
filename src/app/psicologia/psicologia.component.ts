import { Component, OnInit,Input,Output,EventEmitter,ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../data.service';
import {Chart} from 'node_modules/chart.js'
import { MatSelect } from "@angular/material/select";
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
  listaCursos;
  private listaEmociones;
  private avgEmotionStudent;
  private emotions = [];
  private avgEmotions = [];
  private courseName;
  @ViewChild("matCurso") matCursoEmocion: MatSelect;
  @Input() showResponse: Array<any>;
  @Output() passRender : EventEmitter<boolean>;
  constructor(private dataService:DataService) { 
    this.passRender = new EventEmitter();
  }

  ngOnInit(): void {
    this.getCursos();
  }
  ngAfterViewInit() {
    this.matCursoEmocion.valueChange.subscribe((value) => {
      this.courseName = value;
    });
  }

  async getEmotions(){
    var id = (<HTMLInputElement>document.getElementById("search")).value;
    await this.subscription.add(this.dataService.getEmociones(id).subscribe(///aaa
      data => {
        this.listaEmociones = data;
        this.listaEmociones = this.listaEmociones.response;
        console.log("Todo el response",this.listaEmociones);
        for (let emo in this.listaEmociones){
          console.log(emo)
          ELEMENT_DATA.push(this.listaEmociones[emo])
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
  chart(ctx,labels,data){
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Emociones",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  async getAvgStuden(){
    this.emotions = [];
    this.avgEmotions = [];
    var ctx = (<HTMLInputElement>document.getElementById("myChart"));
    var studentId = (<HTMLInputElement>document.getElementById("carne")).value;
    var start = (<HTMLInputElement>document.getElementById("startStudent")).value;
    
    var end = (<HTMLInputElement>document.getElementById("endStudent")).value
    console.log(start, end)
    
    this.subscription.add(this.dataService.getAvgEmotionsStudent(studentId,start,end).subscribe(///aaa
      data => {
        this.avgEmotionStudent = data;
        this.avgEmotionStudent = this.avgEmotionStudent.response;
        for (var emotion in this.avgEmotionStudent){
          this.emotions.push(this.avgEmotionStudent[emotion]["emocion"]);
          this.avgEmotions.push(this.avgEmotionStudent[emotion]["reincidencia"])
         
        }
        console.log(this.emotions);
        this.chart(ctx,this.emotions,this.avgEmotions)
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
  getAvgCourse(){
    var ctx = (<HTMLInputElement>document.getElementById("avgCourse"));
    this.emotions = [];
    this.avgEmotions = [];
    //var courseName = (<HTMLInputElement>document.getElementById("curso")).value;
    var start = (<HTMLInputElement>document.getElementById("startCourse")).value;
    var end = (<HTMLInputElement>document.getElementById("endCourse")).value
    console.log(this.courseName)
    this.subscription.add(this.dataService.getAvgEmotionsCourse(this.courseName,start,end).subscribe(///aaa
      data => {
        this.avgEmotionStudent = data;
        this.avgEmotionStudent = this.avgEmotionStudent.response;
        for (var emotion in this.avgEmotionStudent){
          this.emotions.push(this.avgEmotionStudent[emotion]["emocion"]);
          this.avgEmotions.push(this.avgEmotionStudent[emotion]["reincidencia"])
        }
        console.log(this.emotions);
        this.chart(ctx,this.emotions,this.avgEmotions)
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
  getCursos() {
    this.subscription.add(
      this.dataService.getCursos().subscribe(
        ///aaa
        (data) => {
          this.listaCursos = data;
          this.listaCursos = this.listaCursos.response;
          console.log(this.listaCursos)
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
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
