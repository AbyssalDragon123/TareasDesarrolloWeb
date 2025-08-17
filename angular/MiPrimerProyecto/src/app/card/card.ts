import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-card',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent{

}