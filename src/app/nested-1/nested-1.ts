import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nested-1',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './nested-1.html',
  styleUrl: './nested-1.css',
})
export class Nested1 {

}
