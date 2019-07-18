import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Viz1Component } from './viz1/viz1.component';
import { Viz2Component } from './viz2/viz2.component';

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
    {
        path: 'viz2',
        component: Viz2Component
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }