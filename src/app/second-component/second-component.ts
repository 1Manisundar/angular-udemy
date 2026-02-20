import { Component, OnChanges, SimpleChange, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-second-component',
  imports: [RouterOutlet],
  templateUrl: './second-component.html',
  styleUrl: './second-component.css',
})
export class SecondComponent implements OnChanges, OnInit{

  @Input() inputValueInChild = '';
  currentValue :string | undefined;
  previousValue : string | undefined;

  ngOnChanges(changes: { [propName: string]: SimpleChange<any>; }): void {
    console.log(changes)
    console.log(this.inputValueInChild)
    if(changes['inputValueInChild']){
      this.currentValue = changes['inputValueInChild'].currentValue;
      this.previousValue = changes['inputValueInChild'].previousValue;
    }
  }

  count =0;
  countInterval : any;

  setCounter (){
 this.countInterval=    setInterval(() =>{
      if(this.count <=5){
    console.log(this.count++)  
    }else {
      console.log('counterInterval', this.countInterval)
      clearInterval(this.countInterval);
    }
    }, 0);

  }

  ngOnInit(): void {
    this.setCounter()
    
  }

}
