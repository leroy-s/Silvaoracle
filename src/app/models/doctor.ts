import { Especialidad } from './especialidad';

export class Doctor {
    id: number;
    nombres: string; 
    apellidos: string;
    especialidad: Especialidad;  // Cambiado a tipo Especialidad

    constructor(id: number = 0, nombres = '', apellidos = '', especialidad: Especialidad = new Especialidad()) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.especialidad = especialidad;  // Asigna un objeto Especialidad
    }
}
