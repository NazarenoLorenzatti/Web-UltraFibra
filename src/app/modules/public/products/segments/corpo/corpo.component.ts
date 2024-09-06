import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

interface info {
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

  public sectionsInfo!: info[];
  private viewportScroller = inject(ViewportScroller);
  private sectionServices = inject(SectionService);
  public section: any;

  constructor() {  
    this.sectionServices.getSection('products-corpo').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
          this.sectionsInfo = [
            {
              title: "Internet para Empresas.",
              article: this.section.texts[0].text,
              img: this.section.imgs[1].urlObs,
              reverse: false,
            },
            {
              title: "Conexiones simétricas y asimetricas",
              article: this.section.texts[1].text,
              img: this.section.imgs[2].urlObs,
              reverse: true,
            },
            {
              title: "Desafiamos el límite de la comunicación.",
              article: this.section.texts[2].text,
              img: this.section.imgs[3].urlObs,
              reverse: false,
            },
          ]
        } 
      }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

    this.viewportScroller.scrollToPosition([0, 0]);
    
  }
}
