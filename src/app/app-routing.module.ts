import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPrivateModule } from './modules/private/router-private.module';
import { RouterPublicModule } from './modules/public/router-public.module';

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', redirectTo: '/app/home'},
  { path: 'app', pathMatch: 'full', redirectTo: '/app'}, 
  { path: '**', redirectTo: '/app/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: false, useHash: true}
    ),
    RouterPrivateModule,
    RouterPublicModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
