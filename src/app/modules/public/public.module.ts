import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from '../templates/ng-prime.module';
import { TemplateModule } from '../templates/template.module';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';

import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './company/components/header/header.component';
import { AboutusComponent } from './company/components/aboutus/aboutus.component';
import { ValuesComponent } from './company/components/values/values.component';
import { WorkusComponent } from './company/components/workus/workus.component';
import { GridsComponent } from './grid/components/grids/grids.component';
import { ManualsComponent } from './grid/components/manuals/manuals.component';
import { HomelikeComponent } from './products/segments/homelike/homelike.component';
import { PymesComponent } from './products/segments/pymes/pymes.component';
import { CorpoComponent } from './products/segments/corpo/corpo.component';
import { PlansComponent } from './products/segments/homelike/components/plans/plans.component';
import { DetailsComponent } from './products/segments/pymes/components/details/details.component';
import { HeaderProductsComponent } from './products/commons/header-products/header-products.component';
import { HeaderCorpoComponent } from './products/segments/corpo/components/header-corpo/header-corpo.component';
import { InfoComponent } from './products/segments/corpo/components/info/info.component';
import { LoginComponent } from './login/login.component';
import { WarningComponent } from './login/components/warning/warning.component';
import { ConfirmComponent } from './login/components/confirm/confirm.component';
import { CommonsComponent } from './commons/commons.component';
import { PromosComponent } from './home/components/promos/promos.component';
import { ContactInfoComponent } from './commons/contact-info/contact-info.component';
import { BannerCineplusComponent } from './commons/banner-cineplus/banner-cineplus.component';
import { BannerSeriesComponent } from './commons/banner-series/banner-series.component';
import { ElementSelfManagementComponent } from './commons/element-self-management/element-self-management.component';
import { FaqSectionComponent } from './commons/faq-section/faq-section.component';
import { SectionsTemplateComponent } from './commons/sections-template/sections-template.component';
import { WhatsappComponent } from './commons/whatsapp/whatsapp.component';
import { ClientsComponent } from './commons/clients/clients.component';
import { CarrouselComponent } from './commons/carrousel/carrousel.component';
import { SectionComponent } from './products/segments/corpo/components/section/section.component';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { FooterComponent } from './commons/footer/footer.component';
import { WorkusButtonComponent } from './commons/workus-button/workus.component';
import { SectionPlansPymesComponent } from './products/segments/pymes/components/section-plans/section-plans.component';
import { PromosSectionComponent } from './commons/promos-section/promos-section.component';
import { HeaderGridComponent } from './grid/components/header-grid/header-grid.component';
import { DuplicacionComponent } from './commons/duplicacion/duplicacion.component';
import { TerminosComponent } from './terminos/terminos.component';


@NgModule({
  declarations: [
    HomeComponent,
    GridComponent,
    PromosComponent,
    CompanyComponent,
    HeaderComponent,
    AboutusComponent,
    ValuesComponent,
    GridsComponent,
    ManualsComponent,
    HomelikeComponent,
    PymesComponent,
    CorpoComponent,
    PlansComponent,
    DetailsComponent,
    HeaderProductsComponent,
    HeaderCorpoComponent,
    InfoComponent,
    LoginComponent,
    WarningComponent,
    ConfirmComponent,
    CommonsComponent,
    ContactInfoComponent,
    BannerCineplusComponent,
    BannerSeriesComponent,
    ContactInfoComponent,
    ElementSelfManagementComponent,
    FaqSectionComponent,
    SectionsTemplateComponent,
    WhatsappComponent,
    ClientsComponent,
    HomeComponent,
    CarrouselComponent,
    SectionComponent,
    WorkusComponent,
    WorkusButtonComponent,
    NavbarComponent,
    FooterComponent,
    PromosSectionComponent,
    SectionPlansPymesComponent,
    HeaderGridComponent,
    DuplicacionComponent,
    TerminosComponent
  ],
  imports: [
    CommonModule,
    TemplateModule,
    NgPrimeModule
  ]
})
export class PublicModule { }
