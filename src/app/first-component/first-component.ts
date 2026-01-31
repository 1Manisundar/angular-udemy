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

  a = 5;
  b = 10;
  value = this.a + this.b

  propertyValue: string = "Hi this is me";
  disable: boolean = false;

  image = 'https://picsum.photos/id/237/200/300'

  event() {
    alert("This is event binding");
  }

  event1(msg: any) {
    alert(msg);
  }

  currentMessage: string = "";

  onTyping(event: Event) {
    // We cast the event target to an HTMLInputElement to get the value
    const element = event.target as HTMLInputElement;
    this.currentMessage = element.value;
    console.log("User typed:", element.value);
  }

  count:number =0;
  counter(type:string){
    type === 'incre' ? this.count++ : this.count--;
  }
}
