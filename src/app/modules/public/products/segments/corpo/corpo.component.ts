import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

interface CorpoInfo {
  title: string;
  article: string;
  img: string;
  reverse: boolean;
}

@Component({
  selector: 'app-corpo',
  templateUrl: './corpo.component.html',
  styleUrls: ['./corpo.component.css']
})
export class CorpoComponent {

  public sectionsInfo: CorpoInfo[] = [];
  public section: any;

  private readonly viewportScroller = inject(ViewportScroller);
  private readonly sectionServices = inject(SectionService);

  constructor() {
    this.loadContent();
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  private loadContent(): void {
    this.sectionServices.getSection('products-corpo').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo !== '00') {
          return;
        }

        const content = data?.sectionsWebResponse?.sectionsWeb?.[0];

        if (!content) {
          return;
        }

        this.section = content;

        this.sectionsInfo = [
          {
            title: 'Internet para Empresas',
            article: content.texts?.[0]?.text ?? '',
            img: content.imgs?.[1]?.urlObs ?? '',
            reverse: false
          },
          {
            title: 'Conexiones simétricas y asimétricas',
            article: content.texts?.[1]?.text ?? '',
            img: content.imgs?.[2]?.urlObs ?? '',
            reverse: true
          },
          {
            title: 'Desafiamos el límite de la comunicación',
            article: content.texts?.[2]?.text ?? '',
            img: content.imgs?.[3]?.urlObs ?? '',
            reverse: false
          }
        ];
      },
      error: (error: any) => {
        console.error('Error loading corporate content', error);
      }
    });
  }

    goToWhatsapp() {
    const whatsappUrl = 'https://wa.me/5493476620784?text=¡Hola! Buen día. Quisiera recibir asesoramiento detallado sobre las propuestas y planes que ofrecen para Empresas.%20';
    window.open(whatsappUrl, '_blank');
  }

      scrollToPlans(): void {
    this.viewportScroller.scrollToAnchor('planes-hogar');
  }
}
