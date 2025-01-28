import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from './ng-prime.module';
import { ButtonPUtlraComponent } from './commons/button-p-utlra/button-p-utlra.component';
import { ButtonP2UtlraComponent } from './commons/button-p2-utlra/button-p2-utlra.component';
import { ButtonsRedesUltraComponent } from './commons/buttons-redes-ultra/buttons-redes-ultra.component';
import { ButtonSubmitUltraComponent } from './commons/button-submit-ultra/button-submit-ultra.component';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { TittleComponent } from './commons/tittle/tittle.component';

@NgModule({
  declarations: [
    ButtonPUtlraComponent,
    ButtonP2UtlraComponent,
    ButtonsRedesUltraComponent,
    ButtonSubmitUltraComponent,
    MonthNamePipe,
    TittleComponent,
  ],
  exports: [
    ButtonPUtlraComponent,
    ButtonP2UtlraComponent,
    ButtonsRedesUltraComponent,
    ButtonSubmitUltraComponent,
    MonthNamePipe,
    TittleComponent,
  ],
  imports: [
    NgPrimeModule,
    CommonModule
  ]
})
export class TemplateModule { }
