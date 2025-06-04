import { Routes } from '@angular/router';
import { Main } from './main/main';

export const routes: Routes = [
    {
        path:"",
        pathMatch: "full",
        redirectTo: "/home",
    },
    {
        path:"home",
        component: Main
    }
];
