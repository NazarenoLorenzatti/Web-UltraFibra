import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from '../templates/ng-prime.module';
import { TemplateModule } from '../templates/template.module';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';
import { ContactComponent } from './contact/contact.component';
import { MegasComponent } from './home/components/megas/megas.component';
import { ClientsComponent } from './home/components/clients/clients.component';
import { TittleComponent } from './home/components/megas/tittle/tittle.component';
import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './company/components/header/header.component';
import { AboutusComponent } from './company/components/aboutus/aboutus.component';
import { ValuesComponent } from './company/components/values/values.component';
import { WorkusComponent } from './company/components/workus/workus.component';
import { CarrouselComponent } from './grid/components/carrousel/carrousel.component';
import { GridsComponent } from './grid/components/grids/grids.component';
import { ManualsComponent } from './grid/components/manuals/manuals.component';
import { MeansComponent } from './contact/components/means/means.component';
import { HomelikeComponent } from './products/segments/homelike/homelike.component';
import { PymesComponent } from './products/segments/pymes/pymes.component';
import { CorpoComponent } from './products/segments/corpo/corpo.component';
import { PlansComponent } from './products/segments/homelike/components/plans/plans.component';
import { DetailsComponent } from './products/segments/pymes/components/details/details.component';
import { HeaderProductsComponent } from './products/commons/header-products/header-products.component';
import { FormPymesComponent } from './products/segments/pymes/components/form/form.component';
import { HeaderCorpoComponent } from './products/segments/corpo/components/header-corpo/header-corpo.component';
import { InfoComponent } from './products/segments/corpo/components/info/info.component';
import { CarrouselHomeComponent } from './home/components/carrousel-home/carrousel-home.component';
import { OfficesComponent } from './contact/components/offices/offices.component';
import { LoginComponent } from './login/login.component';
import { WarningComponent } from './login/components/warning/warning.component';
import { ConfirmComponent } from './login/components/confirm/confirm.component';
import { CommonsComponent } from './commons/commons.component';

@NgModule({
  declarations: [
    HomeComponent,
    GridComponent,
    ContactComponent,
    MegasComponent,
    ClientsComponent,
    TittleComponent,
    CompanyComponent,
    HeaderComponent,
    AboutusComponent,
    ValuesComponent,
    WorkusComponent,
    CarrouselComponent,
    GridsComponent,
    ManualsComponent,
    MeansComponent,
    HomelikeComponent,
    PymesComponent,
    CorpoComponent,
    PlansComponent,
    DetailsComponent,
    HeaderProductsComponent,
    FormPymesComponent,
    HeaderCorpoComponent,
    InfoComponent,
    CarrouselHomeComponent,
    OfficesComponent,
    LoginComponent,
    WarningComponent,
    ConfirmComponent,
    CommonsComponent
  ],
  imports: [
    CommonModule,
    TemplateModule,
    NgPrimeModule
  ]
})
export class PublicModule { }
