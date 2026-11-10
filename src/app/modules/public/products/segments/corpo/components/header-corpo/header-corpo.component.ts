import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-header-corpo',
  templateUrl: './header-corpo.component.html',
  styleUrls: ['./header-corpo.component.css']
})
export class HeaderCorpoComponent {

  public section: any;

  private readonly sectionServices = inject(SectionService);

  @Output() scrollPlans = new EventEmitter<void>();

  onScrollToPlans(): void {
    this.scrollPlans.emit();
  }

  constructor() {
    this.loadSection();
  }

  private loadSection(): void {
    this.sectionServices.getSection('products-corpo').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo !== '00') {
          return;
        }

        this.section = data?.sectionsWebResponse?.sectionsWeb?.[0];
      },
      error: (error: any) => {
        console.error('Error loading corporate hero', error);
      }
    });
  }

  goToWhatsapp() {
    const whatsappUrl = 'https://wa.me/5493476620784?text=¡Hola! Buen día. Quisiera recibir asesoramiento detallado sobre las propuestas y planes que ofrecen para Empresas.%20';
    window.open(whatsappUrl, '_blank');
  }
}
