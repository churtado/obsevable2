import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Viz1Component } from './viz1/viz1.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/viz1',
        pathMatch: 'full'
    },
    {
        path: 'viz1',
        component: Viz1Component
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }