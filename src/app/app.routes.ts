import { Routes } from '@angular/router';
import { FirstComponent } from './first-component/first-component';
import { SecondComponent } from './second-component/second-component';
import { RouteA } from './route-a/route-a';
import { RouteF } from './route-f/route-f';
import { RouteE } from './route-e/route-e';
import { RouteD } from './route-d/route-d';
import { RouteC } from './route-c/route-c';
import { RouteB } from './route-b/route-b';
import { DynamicRoute } from './dynamic-route/dynamic-route';
import { Page404 } from './page-404/page-404';
import { Nested1 } from './nested-1/nested-1';
import { Nested2 } from './nested-2/nested-2';
import { Nested3 } from './nested-3/nested-3';

export const routes: Routes = [
    { path: 'first', component: FirstComponent },
    { path: 'second', component: SecondComponent },
    { path: 'home', component: RouteA },
    { path: 'work', component: RouteB },
    { path: 'about', component: RouteC },
    { path: 'blog', component: RouteD },
    { path: 'service', component: RouteE },
    { path: 'contact', component: RouteF },
    { path: 'dynamic', component: DynamicRoute },
    { path: 'dynamic/:empId', component: DynamicRoute },

    { path: 'parent', component: Nested1, children: [{ path: 'child1', component: Nested2 }, { path: 'child2', component: Nested3 }] },
    { path: '**', component: Page404 }
];
