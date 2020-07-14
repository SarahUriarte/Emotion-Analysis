import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import{MatFormField} from '@angular/material/form-field'
import { DataService } from '../data.service';
import {Subscription} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private user;
  private respuesta;
  @Input() showResponse: Array<any>;
  @Output() passRender : EventEmitter<boolean>;
  constructor(private dataService:DataService) {
    this.passRender = new EventEmitter();
   }
  ngOnInit(): void {
    
  }
  rol: string;
  roles: string[] = ['Docente', 'Dep.Psicología', 'Estudiante'];
  
  
  insertarPersona(){
    var usr = (<HTMLInputElement>document.getElementById("username")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var identification = (<HTMLInputElement>document.getElementById("identification")).value;
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var last_name = (<HTMLInputElement>document.getElementById("last_name")).value;
    var phone_number = (<HTMLInputElement>document.getElementById("phone_number")).value;
    //var rol = rol;
    
    this.user = {username: usr, 
      password: password, 
      identification: identification,
      name: name, 
      last_name: last_name, 
      phone_number: phone_number, 
      rol: this.rol};
    //console.log(username,password,identification,name,last_name,phone_number,this.rol);
    this.subscription.add(this.dataService.registrar(this.user).subscribe(
      data => {
        this.respuesta = data;
        this.respuesta = this.respuesta.response
        console.log(this.respuesta)
      },
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error) {
          console.log('Error del lado del cliente')
        }else {
          console.log('Error del lado del servidor')
        }
      }
    ))
  }

}
