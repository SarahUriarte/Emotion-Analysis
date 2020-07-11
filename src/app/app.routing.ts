import { Routes               } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ComputacionComponent } from './computacion/computacion.component';
import { PsicologiaComponent  } from './psicologia/psicologia.component';
import { RegistroComponent    } from './registro/registro.component'
import { LoginComponent       } from './login/login.component';

export const ROUTES: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
      path: 'estudiantes', component: EstudiantesComponent
    },
    {
      path: 'computacion', component: ComputacionComponent,
    },
    {
      path: 'psicologia', component: PsicologiaComponent
    },
    {
      path: 'registro', component: RegistroComponent
    },
    {
        path: '**', redirectTo: ''
    }
];
