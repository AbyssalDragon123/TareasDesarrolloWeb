// quejas.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../Service/empleado-service';
import { EmpleadosInterface } from '../../interfaces/empleados-interface';

// Material
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


// ---------------------------------------------------------------------------
// Componente principal (lista + botones que abren diálogos)
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-quejas',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,


  ],
  templateUrl: './quejas.html',
  styleUrls: ['./quejas.css']
})
export class Quejas {
  empleados: EmpleadosInterface[] = [];
  cargando = true;

  constructor(
    private empleadoService: EmpleadoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.cargando = true;
    this.empleadoService.getEmpleados().subscribe({
      next: data => { this.empleados = data; this.cargando = false; },
      error: err => { console.error('Error al cargar empleados', err); this.cargando = false; }
    });
  }

  nuevo(): void {
    const ref = this.dialog.open(EmpleadoFormDialog, {
      width: '520px',
      disableClose: true,
      data: {
        modo: 'crear',
        empleado: { id: 0, nombre: '', puesto: '', salario: 0, edad: 0 } as EmpleadosInterface
      }
    });
    ref.afterClosed().subscribe(ok => { if (ok) this.cargarEmpleados(); });
  }

  editar(emp: EmpleadosInterface): void {
    const ref = this.dialog.open(EmpleadoFormDialog, {
      width: '520px',
      disableClose: true,
      data: { modo: 'editar', empleado: { ...emp } }
    });
    ref.afterClosed().subscribe(ok => { if (ok) this.cargarEmpleados(); });
  }

  eliminar(emp: EmpleadosInterface): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '420px',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: `¿Está seguro que desea eliminar a este empleado?\n\n"${emp.nombre}" (ID: ${emp.id})`
      }
    });
    ref.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.empleadoService.deleteEmpleado(emp.id).subscribe({
          next: () => this.cargarEmpleados(),
          error: err => { console.error('Error al eliminar empleado', err); alert('No se pudo eliminar el empleado.'); }
        });
      }
    });
  }
}


// ---------------------------------------------------------------------------
// Diálogo: Formulario Agregar/Editar
// ---------------------------------------------------------------------------
@Component({
  selector: 'empleado-form-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{ data.modo === 'crear' ? 'Agregar empleado' : 'Editar empleado' }}</h2>

    <div mat-dialog-content>
      <form [formGroup]="form">
        <div class="grid">
          <mat-form-field *ngIf="data.modo === 'editar'" appearance="fill">
            <mat-label>ID</mat-label>
            <input matInput formControlName="id" readonly>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Nombre</mat-label>
            <input matInput formControlName="nombre" required>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Puesto</mat-label>
            <input matInput formControlName="puesto" required>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Edad</mat-label>
            <input matInput type="number" formControlName="edad" min="0">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Salario</mat-label>
            <input matInput type="number" step="0.01" formControlName="salario" min="0">
          </mat-form-field>
        </div>
      </form>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-stroked-button (click)="cerrar()" [disabled]="guardando">Cancelar</button>
      <button mat-raised-button color="primary" (click)="guardar()" [disabled]="form.invalid || guardando">
        {{ data.modo === 'crear' ? 'Agregar' : 'Guardar cambios' }}
      </button>
    </div>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 8px; }
  `],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EmpleadoFormDialog {
  form: FormGroup;
  guardando = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'crear' | 'editar'; empleado: EmpleadosInterface },
    private dialogRef: MatDialogRef<EmpleadoFormDialog>,
    private fb: FormBuilder,
    private empleadoService: EmpleadoService
  ) {
    this.form = this.fb.group({
      id: [{ value: data.empleado.id, disabled: data.modo === 'crear' }],
      nombre: [data.empleado.nombre, [Validators.required]],
      puesto: [data.empleado.puesto, [Validators.required]],
      edad: [data.empleado.edad, [Validators.min(0)]],
      salario: [data.empleado.salario, [Validators.min(0)]],
    });
  }

  cerrar(): void { this.dialogRef.close(false); }

  guardar(): void {
    if (this.form.invalid) return;
    this.guardando = true;

    const raw = this.form.getRawValue();
    const payload: EmpleadosInterface = {
      id: this.data.modo === 'crear' ? 0 : raw.id,
      nombre: raw.nombre,
      puesto: raw.puesto,
      edad: raw.edad ?? 0,
      salario: raw.salario ?? 0
    };

    if (this.data.modo === 'crear') {
      const { id, ...bodySinId } = payload;
      this.empleadoService.createEmpleado(bodySinId as Omit<EmpleadosInterface,'id'>).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => { alert('No se pudo crear el empleado'); this.guardando = false; }
      });
    } else {
      this.empleadoService.updateEmpleado(payload.id, payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => { alert('No se pudo actualizar'); this.guardando = false; }
      });
    }
  }
}


// ---------------------------------------------------------------------------
// Diálogo: Confirmación de eliminación
// ---------------------------------------------------------------------------
@Component({
  selector: 'confirm-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <div mat-dialog-content>
      <pre style="white-space:pre-wrap; font-family:inherit; margin:0;">{{ data.mensaje }}</pre>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-stroked-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="aceptar()">Eliminar</button>
    </div>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ConfirmDialog {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensaje: string }
  ) {}
  cancelar(): void { this.dialogRef.close(false); }
  aceptar(): void { this.dialogRef.close(true); }
}
