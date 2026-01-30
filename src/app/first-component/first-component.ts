import { Component } from '@angular/core';
import { SecondComponent } from '../second-component/second-component';

@Component({
  selector: 'app-first-component',
  imports: [SecondComponent],
  templateUrl: './first-component.html',
  styleUrl: './first-component.css',
})
export class FirstComponent {
   who = "Mani";
}
