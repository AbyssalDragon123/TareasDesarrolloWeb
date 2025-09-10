import { Routes } from '@angular/router';
import { Menu } from './vistas/menu/menu';
import { Inicio } from './vistas/inicio/inicio';
import { Pagos } from './vistas/pagos/pagos';
import { Multas } from './vistas/multas/multas';
import { Quejas } from './vistas/quejas/quejas';

export const routes: Routes = [
  {
    path: '',
    component: Menu, // El menú es la base
    children: [
      { path: '', component: Inicio },           // Página por defecto
      { path: 'pagos', component: Pagos },       // Ruta para pagos
      { path: 'multas', component: Multas },     // Ruta para multas
        { path: 'quejas', component: Quejas },     // Ruta para multas
    ]
  },
  { path: '**', redirectTo: '' } // Redirige a inicio si la ruta no existe
];
