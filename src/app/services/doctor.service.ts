import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl ='http://localhost:8080/api/doctor';
  
  constructor(private http:HttpClient) { }

  //listar las categoria
  getDoctor():Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorById(id:number):Observable<Doctor>{
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  createDoctor(categoria: Doctor): Observable<Doctor> {    
    return this.http.post<Doctor>(this.apiUrl, categoria);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateDoctor(categoria:Doctor, id:number): Observable<Doctor>{
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, categoria);
  }
}
