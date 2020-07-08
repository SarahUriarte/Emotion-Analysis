import { Component, OnInit } from '@angular/core';
import{MatFormField} from '@angular/material/form-field'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  rol: string;
  roles: string[] = ['Docente', 'Dep.Psicología', 'Estudiante'];
}
