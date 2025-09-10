// empleado-service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadosInterface } from '../interfaces/empleados-interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:7148/api/Empleados'; // Ajusta si usas HTTPS

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<EmpleadosInterface[]> {
    return this.http.get<EmpleadosInterface[]>(this.apiUrl);
  }

  getEmpleado(id: number): Observable<EmpleadosInterface> {
    return this.http.get<EmpleadosInterface>(`${this.apiUrl}/${id}`);
  }

  createEmpleado(empleado: Omit<EmpleadosInterface,'id'>): Observable<EmpleadosInterface> {
    return this.http.post<EmpleadosInterface>(this.apiUrl, empleado);
  }

  updateEmpleado(id: number, empleado: EmpleadosInterface): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
