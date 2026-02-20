import { Routes } from '@angular/router';
import { FirstComponent } from './first-component/first-component';
import { SecondComponent } from './second-component/second-component';

export const routes: Routes = [
    { path: 'first', component: FirstComponent },
    { path: 'second', component: SecondComponent }
];
