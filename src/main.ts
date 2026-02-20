import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. Import router tools
import { appConfig } from './app/app.config';

@Component({
  selector: 'app-root', // Make sure your index.html has <app-root></app-root>
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 2. Add RouterOutlet here
  template: `
    <div style="padding: 10px; background: #eee; margin-bottom: 20px;">
      <a routerLink="/first" style="margin-right: 15px;">Go to First Component</a>
      <a routerLink="/second">Go to Second Component</a>
    </div>

    <router-outlet></router-outlet>
  `,
})
export class App {
  name = 'Angular';
}

// 4. Bootstrap the App shell instead of FirstComponent
bootstrapApplication(App, appConfig).catch((err) => console.error(err));