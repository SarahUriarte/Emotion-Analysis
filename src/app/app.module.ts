import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
// tslint:disable-next-line:no-unused-expression
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import{MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

// tslint:disable-next-line:no-unused-expression
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';

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
    WebcamModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSortModule, 
    MatTableModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
