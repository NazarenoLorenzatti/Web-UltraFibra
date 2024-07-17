import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAreaComponent } from './user-area/user-area.component';
import { InvoicesComponent } from './user-area/invoices/invoices.component';
import { ServicesComponent } from './user-area/services/services.component';
import { HomeUserComponent } from './user-area/home-user/home-user.component';
import { AuthGuard } from 'src/app/AuthGuard';

const rutas: Routes = [
    {
        path: 'user',
        component: UserAreaComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeUserComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'invoices',
        component: InvoicesComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'services',
        component: ServicesComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'tickets',
        component: ServicesComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class RouterPrivateModule { }