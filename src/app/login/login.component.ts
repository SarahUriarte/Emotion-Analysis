import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { DataService } from "../data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private service: DataService, private _router:Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.subscription.add(
      this.service.iniciarSesion(this.loginForm.value).subscribe(
        ///aaa
        (data) => {
          data = data;
          console.log(data);
          if(data["rol"] === 'E')
          {
            this._router.navigate(['estudiantes'])
            
          }
          if(data["rol"] === 'P')
          {
            this._router.navigate(['psicologia'])
        
          }
          if(data["rol"] === 'C')
          {
            this._router.navigate(['computacion'])
          }
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
