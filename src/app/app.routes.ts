import { Routes } from '@angular/router';
import { FirstComponent } from './first-component/first-component';
import { SecondComponent } from './second-component/second-component';
import { RouteA } from './route-a/route-a';
import { RouteF } from './route-f/route-f';
import { RouteE } from './route-e/route-e';
import { RouteD } from './route-d/route-d';
import { RouteC } from './route-c/route-c';
import { RouteB } from './route-b/route-b';

export const routes: Routes = [
    { path: 'first', component: FirstComponent },
    { path: 'second', component: SecondComponent },
    {path: 'home', component:RouteA},
    {path: 'work', component:RouteB},
    {path: 'about', component:RouteC},
    {path: 'blog', component:RouteD},
    {path: 'service', component:RouteE},
    {path: 'contact', component:RouteF}
];
