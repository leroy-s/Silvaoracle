import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Especialidad } from '../models/especialidad';
import { EspecialidadService } from '../services/especialidad.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    FormsModule,
    ToastModule,
    MessageModule
  ],
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {
  visible: boolean = false;
  especialidad: Especialidad = new Especialidad();
  especialidades: Especialidad[] = [];

  constructor(
    private especialidadService: EspecialidadService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarEspecialidad();
  }

  showDialog() {
    this.visible = true;
    this.especialidad = new Especialidad();
  }

  listarEspecialidad() {
    this.especialidadService.getEspecialidad().subscribe(
      (data: Especialidad[]) => {
        this.especialidades = data;
        console.log("Datos obtenidos:", data);  // Depuración
      },
      (error) => {
        console.error('Error al obtener especialidades', error);
      }
    );
  }
  

  agregarEspecialidad() {
    // Validación de nombre
    if (!this.especialidad.nombre) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre es obligatorio.',
      });
      return;
    }

    if (this.especialidad.id === 0) {
      // Crear una nueva especialidad
      this.especialidadService.createEspecialidad(this.especialidad).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Especialidad registrada',
          });
          this.listarEspecialidad(); // Actualizar la lista de especialidades
          this.visible = false; // Cerrar el diálogo
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar la especialidad',
          });
        }
      });
    } else {
      // Editar una especialidad existente
      this.especialidadService.updateEspecialidad(this.especialidad, this.especialidad.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Especialidad actualizada',
          });
          this.listarEspecialidad(); // Actualizar la lista de especialidades
          this.visible = false; // Cerrar el diálogo
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la especialidad',
          });
        }
      });
    }
  }

  // Método para eliminar una especialidad
  eliminarEspecialidad(id: number) {
    if (id > 0) {
      this.especialidadService.deleteEspecialidad(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Especialidad eliminada correctamente',
          });
          this.listarEspecialidad(); // Actualizar la lista después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar especialidad:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la especialidad',
          });
        }
      });
    } else {
      console.error('ID inválido:', id);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID no válido para eliminar',
      });
    }
  }

  // Método para abrir el diálogo de edición con los datos existentes
  editarEspecialidad(especialidad: Especialidad) {
    console.log('Editando especialidad:', especialidad); 
    this.especialidad = { ...especialidad };  
    this.visible = true;  
  }
}
