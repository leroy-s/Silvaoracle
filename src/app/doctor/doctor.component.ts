import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { EspecialidadService } from '../services/especialidad.service';
import { Especialidad } from '../models/especialidad';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    MessageModule,
    DropdownModule
  ],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
  
})
export class DoctorComponent {
  visible: boolean = false;
  doctor: Doctor = new Doctor();
  doctores: Doctor[] = [];
  especialidades: Especialidad[] = []; // Lista de especialidades


  constructor(
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService, // Servicio para especialidades
    private messageService: MessageService

  ) {}

  ngOnInit(): void {
    this.listarDoctor();
    this.cargarEspecialidades(); // Cargar especialidades disponibles
  }

  showDialog() {
    this.visible = true;
    this.doctor = new Doctor();
  }

  listarDoctor() {
    this.doctorService.getDoctor().subscribe(
      (data: Doctor[]) => {
        this.doctores = data;
        console.log("Datos obtenidos:", data);  // Depuración
      },
      (error) => {
        console.error('Error al obtener doctores', error);
      }
    );
  }

  cargarEspecialidades() {
    this.especialidadService.getEspecialidad().subscribe(
      (data: Especialidad[]) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al obtener especialidades', error);
      }
    );
  }

  agregarDoctor() {
    // Validación de campos obligatorios
    if (!this.doctor.nombres || !this.doctor.apellidos || !this.doctor.especialidad) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son obligatorios.',
      });
      return;
    }

    if (this.doctor.id === 0) {
      // Crear un nuevo doctor
      this.doctorService.createDoctor(this.doctor).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Doctor registrado',
          });
          this.listarDoctor();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el doctor',
          });
        }
      });
    } else {
      // Editar un doctor existente
      this.doctorService.updateDoctor(this.doctor, this.doctor.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Doctor actualizado',
          });
          this.listarDoctor(); // Actualizar la lista de doctores
          this.visible = false; // Cerrar el diálogo
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el doctor',
          });
        }
      });
    }
  }

  // Método para eliminar un doctor
  eliminarDoctor(id: number) {
    if (id > 0) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Doctor eliminado correctamente',
          });
          this.listarDoctor();
        },
        error: (err) => {
          console.error('Error al eliminar doctor:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el doctor',
          });
        }
      });
    }
  }

  editarDoctor(doctor: Doctor) {
    this.doctor = { ...doctor };
    this.visible = true;
  }
}