import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'HOME'
    }
    ,
    {
        path: 'doctor',
        component: DoctorComponent,
        title: 'Componente de doctor'
    }
    ,
    {
        path: 'especialidad',
        component:  EspecialidadComponent,
        title: 'Componente de especialidad'
    }
    ,
    {
        path: '**',
        redirectTo :''
    }
];
