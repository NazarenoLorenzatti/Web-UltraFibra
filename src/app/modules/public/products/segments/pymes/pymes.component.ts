import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})
export class PymesComponent {
  private viewportScroller = inject(ViewportScroller);
  private sectionServices = inject(SectionService);

  public section: any;

  constructor() {
    this.sectionServices.getSection('products-pymes').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo === '00' && data?.sectionsWebResponse?.sectionsWeb?.[0]) {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
        }
      },
      error: (error: any) => {
        console.log('Error', error);
      }
    });

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  scrollToPlans(): void {
    this.viewportScroller.scrollToAnchor('planes-pymes');
  }

  goToWhatsapp() {
    const whatsappUrl = 'https://wa.me/5493476620784?text=¡Hola! Buen día. Quisiera recibir asesoramiento detallado sobre las propuestas y planes que ofrecen para comercios.%20';
    window.open(whatsappUrl, '_blank');
  }
}
