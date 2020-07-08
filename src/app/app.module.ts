import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
// tslint:disable-next-line:no-unused-expression
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import{MatChipsModule} from '@angular/material/chips';
import{MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ComputacionComponent } from './computacion/computacion.component';
import { PsicologiaComponent } from './psicologia/psicologia.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    ComputacionComponent,
    PsicologiaComponent,
    LoginComponent,
    
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
