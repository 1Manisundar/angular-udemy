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

   a= 5;
   b =10;
   value = this.a + this.b

   propertyValue : string = "Hi this is me";
   disable : boolean = false;

   image = 'https://picsum.photos/id/237/200/300'
}
