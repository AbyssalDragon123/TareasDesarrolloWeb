// app.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,          // 👈 agrega esto
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // 👈 en plural
})
export class App {
  protected readonly title = signal('MuniMixco');
}
