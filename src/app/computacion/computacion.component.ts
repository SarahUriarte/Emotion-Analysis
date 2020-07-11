import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { DataService } from "../data.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-computacion",
  templateUrl: "./computacion.component.html",
  styleUrls: ["./computacion.component.css"],
})
export class ComputacionComponent implements OnInit {
  professorForm: FormGroup;
  courseForm: FormGroup;

  isSubmitted = false;
  panelOpenState = false;
  private subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private service: DataService) {}

  ngOnInit(): void {
    this.professorForm = this.formBuilder.group({
      identification: ["", Validators.required],
      name: ["", Validators.required],
      lastname: ["", Validators.required],
    });
    this.courseForm = this.formBuilder.group({
      code: ["", Validators.required],
      name: ["", Validators.required],
      credits: ["", Validators.required]
    });
  }
  get formControlsProfessor() 
  {
    return this.professorForm.controls;
  }
  get formControlsCourse() 
  {
    return this.professorForm.controls;
  }
  registrarProfesor() 
  {
    console.log(this.professorForm.value)
    this.isSubmitted = true;
    if (this.professorForm.invalid) {
      return;
    }
    this.subscription.add(
      this.service.registrarProfesores(this.professorForm.value).subscribe(
        ///aaa
        (data) => {
          data = data;
          console.log(data)
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
  registrarCurso() 
  {
    console.log(this.courseForm.value)
    this.isSubmitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    this.subscription.add(
      this.service.registrarCurso(this.courseForm.value).subscribe(
        ///aaa
        (data) => {
          data = data;
          console.log(data)
        
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
