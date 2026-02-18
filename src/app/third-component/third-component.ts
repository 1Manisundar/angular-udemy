import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-third-component',
  imports: [CommonModule],
  templateUrl: './third-component.html',
  styleUrl: './third-component.css',
})
export class ThirdComponent implements OnInit, OnDestroy{

    @Input() inputin3rd ='';
    @Input() objectData : {id:number; name:string}[]=[];

    @Output() childEvent = new EventEmitter();

    childMethod(){
      this.childEvent.emit("Hi bro msg is from child comp");
    }

    //task

    @Input() childArr :string[] =[];
    @Output() delArr = new EventEmitter<number>;

    deleteItem(index : number){
      this.delArr.emit(index);
    }

    ngOnInit(){
      console.log('child init');
    }

    ngOnDestroy(): void {
      console.log("child dead")
    }
}
