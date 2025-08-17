import { Component, signal } from '@angular/core';
import { CardComponent } from './card/card'; 
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-root',
  imports: [CommonModule,CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MIPRIMERPROYECTO');
}