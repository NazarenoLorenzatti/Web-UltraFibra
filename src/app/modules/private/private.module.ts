import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from '../templates/template.module';
import { NgPrimeModule } from '../templates/ng-prime.module';
import { UserAreaComponent } from './user-area/user-area.component';
import { InvoicesComponent } from './user-area/invoices/invoices.component';
import { ServicesComponent } from './user-area/services/services.component';
import { TicketsComponent } from './user-area/tickets/tickets.component';
import { HomeUserComponent } from './user-area/home-user/home-user.component';
import { ProfileComponent } from './user-area/profile/profile.component';
import { UpPaymentComponent } from './commons/up-payment/up-payment.component';

import { BtnUpPaymentComponent } from './commons/btn-up-payment/btn-up-payment.component';
import { FooterUserareaComponent } from './commons/footer-userarea/footer-userarea.component';

@NgModule({
  declarations: [
    UserAreaComponent,
    InvoicesComponent,
    ServicesComponent,
    TicketsComponent,
    HomeUserComponent,
    ProfileComponent,
    UpPaymentComponent,

    BtnUpPaymentComponent,
      FooterUserareaComponent,
  ],
  imports: [
    CommonModule,
    TemplateModule,
    NgPrimeModule
  ]
})
export class PrivateModule { }
