import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FirstComponent } from './app/first-component/first-component';

@Component({
  selector: 'app-root',
  standalone: true, // Ensure this is present in Angular 18/19
  imports: [FirstComponent],
  template: `
    <!-- <h1>Hello {{ name }}</h1> -->
    <app-first-component></app-first-component>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
