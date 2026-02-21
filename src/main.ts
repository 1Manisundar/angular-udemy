import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. Import router tools
import { appConfig } from './app/app.config';

@Component({
    selector: 'app-root', // Make sure your index.html has <app-root></app-root>
    standalone: true,
    imports: [RouterOutlet, RouterLink], // 2. Add RouterOutlet here
    template: `
    <header>
        <nav>
            <div>
                <ul>
                    <li><a routerLink="/home">Home</a></li>
                    <li><a routerLink="/work">Work</a></li>
                    <li><a routerLink="/about">about</a></li>
                    <li><a routerLink="/blog">Blog</a></li>
                    <li><a routerLink="/service">Services</a></li>
                    <li><a routerLink="/contact">Contact</a></li>
                 </ul>
            </div>
        </nav>
        <router-outlet></router-outlet>
    </header>
  `,
})
export class App {
    name = 'Angular';
}

// 4. Bootstrap the App shell instead of FirstComponent
bootstrapApplication(App, appConfig).catch((err) => console.error(err));