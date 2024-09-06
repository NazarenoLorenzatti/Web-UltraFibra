import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonsComponent } from './commons/commons.component';
import { CompanyComponent } from './company/company.component';
import { GridComponent } from './grid/grid.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { HomelikeComponent } from './products/segments/homelike/homelike.component';
import { PymesComponent } from './products/segments/pymes/pymes.component';
import { CorpoComponent } from './products/segments/corpo/corpo.component';
import { GovernmentComponent } from './products/segments/government/government.component';
import { LoginComponent } from './login/login.component';
import { WarningComponent } from './login/components/warning/warning.component';
import { ConfirmComponent } from './login/components/confirm/confirm.component';


const rutas: Routes = [
    {
        path: 'app',
        component: CommonsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'us',
        component: CompanyComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'grid',
        component: GridComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'news',
        component: NewsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'contact',
        component: ContactComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'products/homelike',
        component: HomelikeComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'products/pymes',
        component: PymesComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'products/corpo',
        component: CorpoComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'products/gov',
        component: GovernmentComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },
    {
        path: 'warning',
        component: WarningComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },    
    {
        path: 'email-confirm/:token',
        component: ConfirmComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
    },

    
]

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class RouterPublicModule { }