import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { FooterComponent } from './commons/footer/footer.component';
import { NgPrimeModule } from './ng-prime.module';
import { BannerCineplusComponent } from './commons/banner-cineplus/banner-cineplus.component';
import { BannerSeriesComponent } from './commons/banner-series/banner-series.component';
import { FormContactComponent } from './commons/form-contact/form-contact.component';
import { WorkusButtonComponent } from './commons/workus-button/workus.component';
import { WhatsappComponent } from './commons/whatsapp/whatsapp.component';
import { ButtonPUtlraComponent } from './commons/button-p-utlra/button-p-utlra.component';
import { ButtonP2UtlraComponent } from './commons/button-p2-utlra/button-p2-utlra.component';
import { ButtonsRedesUltraComponent } from './commons/buttons-redes-ultra/buttons-redes-ultra.component';
import { ButtonSubmitUltraComponent } from './commons/button-submit-ultra/button-submit-ultra.component';
import { MonthNamePipe } from './pipes/month-name.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BannerCineplusComponent,
    BannerSeriesComponent,
    FormContactComponent,
    WorkusButtonComponent,
    WhatsappComponent,
    ButtonPUtlraComponent,
    ButtonP2UtlraComponent,
    ButtonsRedesUltraComponent,
    ButtonSubmitUltraComponent,
    MonthNamePipe
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BannerCineplusComponent,
    BannerSeriesComponent,
    FormContactComponent,
    WorkusButtonComponent,
    WhatsappComponent,
    ButtonPUtlraComponent,
    ButtonP2UtlraComponent,
    ButtonsRedesUltraComponent,
    ButtonSubmitUltraComponent,
    MonthNamePipe
  ],
  imports: [
    NgPrimeModule,
    CommonModule
  ]
})
export class TemplateModule { }
