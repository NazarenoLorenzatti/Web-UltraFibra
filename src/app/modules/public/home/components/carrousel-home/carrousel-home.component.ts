import { Component, OnInit, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

export interface slides {
  route: string;
  title: string;
  info: string;
  btn: string;
  url: string;
}
@Component({
  selector: 'app-carrousel-home',
  templateUrl: './carrousel-home.component.html',
  styleUrls: ['./carrousel-home.component.css']
})
export class CarrouselHomeComponent {
  listSlides: slides[] = [];
  responsiveOptions!: any[];
  public section: any = [];
  private sectionServices = inject(SectionService);

  constructor() {
    this.sectionServices.getSection('header-home').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0].imgs && data.sectionsWebResponse.sectionsWeb[0].texts) {
            this.listSlides.push(
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[0].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[0].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[3].text,
                btn: "Más información",
                url: "/app/products/homelike"
              },
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[1].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[1].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[4].text,
                btn: "Mas información",
                url: "/app/grid"
              },
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[2].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[2].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[5].text,
                btn: "Mas información",
                url: "/app/products/corpo"
              },
            )
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
}

