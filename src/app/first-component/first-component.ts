import { Component } from '@angular/core';
import { SecondComponent } from '../second-component/second-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThirdComponent } from '../third-component/third-component';

@Component({
  selector: 'app-first-component',
  imports: [SecondComponent, FormsModule, CommonModule, SecondComponent, ThirdComponent],
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
  count: number = 0;

  counter(type: string) {
    // if (type === 'incre'){
    //   this.count++;
    // }else {
    //   this.count--;
    // }

    type === 'incre' ? this.count++ : this.count--;
  }


  /** All other events */
  dbl = 0;

  dbclick() {
    this.dbl++;
  }

  /** $event */
  keyup(e: any) {
    console.log(e.target.value);
  }

  keydown(e: KeyboardEvent) {
    if (e.shiftKey && e.key === 'Y') {
      console.log("shift+y clicked");

    }
  }

  keycount = 0;
  keyCount(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      this.keycount++
    } else if (e.key === "ArrowDown") {
      this.keycount--;
    }
  }

  /** Two way binding */
  staticBind = "this is static binding";
  dynamicBind = "";


  /** Task */
  inputVal = '';
  dynamicVal = '';

  show() {
    this.dynamicVal = this.inputVal;
  }

  /**cart task */

  quantity = 1;

  itemPrice = 100;

  get cartTotal() { return this.quantity * this.itemPrice; }

  // Directives (*ngIf)
  display1: boolean = true;
  display2: boolean = false;
  ngSubmit() {
    this.display2 = !this.display2;
  }

  // Task: Value check
  tsk1: number = 0;

  // @if and @for Toggle
  value1: boolean = true;
  dataToggle() {
    this.value1 = !this.value1;
  }

  // Age Validation (Switch Case)
  age: number = 0;
  eligible: boolean = false;
  eligibilty() {
    this.eligible = this.age >= 18;
  }

  // Class Binding
  colormode: string = 'default-class';
  toggle1() {
    this.colormode = this.colormode === 'default-class' ? 'alt-class' : 'default-class';
  }

  // Style Binding
  name: string = "";
  mail: string = "";
  ismail: boolean = false;
  check(value: string) {
    // Basic regex for email validation
    this.ismail = value.includes('@') && value.includes('.');
  }

  // Template & Container
  isnull: string = "";

  showMessage = {
    dynamic: 'Hi bro this dynamic display'
  }

  a1 = 0;
  b2 = 0;

  calc() {

    return this.a1 + this.b2

  }

  detail = {
    name: 'mani',
    age: 25,
    place: 'hyd'
  }


  /** Task -- Portfolio */

  name1 = '';
  mail1 = '';
  cell = 0;
  address = '';
  qualification = [{ school: '', degree: '', year: '' }]

  addQualification() {
    this.qualification.push({ school: '', degree: '', year: '' })
  }

  isSubmitted = false;
  formSubmit() {
    this.isSubmitted = true;

  }

  formEdit() {
    this.isSubmitted = false;
  }


  /** Life cycle hooks */

  // onChange

  inputValue1 = 'Hii this is for ngOnChanges -- 1st value';

  changeDec() {
    this.inputValue1 = 'Hii this is for ngOnChanges -- 2nd value ';
  }
  constructor() {
    // console.log('HI', this.inputValue1);
  }


  /**Decorators */

  inputDecor1 = "Hi this is input decorator which can be used in child comps";

  //task

  courses: { id: number; name: string }[] = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' },
    { id: 4, name: 'Course4' },
    { id: 5, name: 'Course5' }
  ];

  //output decor using

  message = '';
  parentMethod(childEvent: string) {
    this.message = childEvent;
  }

  //task adding and deleting using input output.

  parentArr:string[] =['Item 1', 'Item 2', 'Item 3'];

  addItem(){
    const newItem = `Item ${this.parentArr.length+1}`;
    this.parentArr.push(newItem);
  }

  deleteItem(index:number){
  if(index >=0 && index < this.parentArr.length){
    this.parentArr.splice(index,1);
  }
  }
}
