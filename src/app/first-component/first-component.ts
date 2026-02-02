import { Component } from '@angular/core';
import { SecondComponent } from '../second-component/second-component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-component',
  imports: [SecondComponent, FormsModule],
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


  /** Counter Example */
  count:number =0;

  counter(type:string){
    // if (type === 'incre'){
    //   this.count++;
    // }else {
    //   this.count--;
    // }

    type === 'incre' ? this.count++ : this.count--;
  }


  /** All other events */
  dbl = 0;
  
  dbclick(){
    this.dbl++;
  }

  /** $event */
  keyup(e:any){
    console.log(e.target.value);
  }

  keydown(e: KeyboardEvent){
    if(e.shiftKey && e.key=== 'Y'){
      console.log("shift+y clicked");

    }
  }

  keycount = 0;
  keyCount(e:KeyboardEvent){
    if(e.key ==="ArrowUp"){
    this.keycount++
    }else if(e.key === "ArrowDown"){
      this.keycount--;
    }
  }

  /** Two way binding */
  staticBind  = "this is static binding";
  dynamicBind = ""; 


  /** Task */
  inputVal = '';
  dynamicVal = '';

  show(){
    this.dynamicVal = this.inputVal;
  }

  /**cart task */

  quantity = 1;

  itemPrice =100;

  get cartTotal() {return this.quantity * this.itemPrice;} 

}
