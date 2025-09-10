import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './pagos.html',
  styleUrls: ['./pagos.css']
})
export class Pagos {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      motivo: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]]
    });
  }

  pagar() {
    if (this.form.valid) {
      console.log('Datos del pago:', this.form.value);
      alert(`Pago registrado:\nMotivo: ${this.form.value.motivo}\nMonto: Q${this.form.value.monto}`);
      this.form.reset();
    }
  }
}
