import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';


export interface slides{
  id: number;
  route: string;
  title: string;
  info: string;
}
@Component({
  selector: 'app-carrousel-gov',
  templateUrl: './carrousel-gov.component.html',
  styleUrls: ['./carrousel-gov.component.css']
})
export class CarrouselGovComponent {
  listSlides!:  slides[];
  responsiveOptions!: any[];
  private sectionServices = inject(SectionService);
  public section: any;

  constructor() {
    this.sectionServices.getSection('products-government').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.section = data.sectionsWebResponse.sectionsWeb[0];
            console.log(this.section?.imgs[2]?.urlObs)
            const img1: slides = { 
              id: 0,
              route: this.section?.imgs[2]?.urlObs,
              title: "Internet Ultra Veloz",
              info: "Internet de ultima generacion",
            };
            const img2: slides = { 
              id: 1,
              route: this.section?.imgs[3]?.urlObs,
              title: "Vigilancia",
              info: "Centros de Monitoreos",
            };
            const img3: slides = { 
              id: 2,
              route: this.section?.imgs[4]?.urlObs,
              title: "Servicios Corporativos",
              info: "Ip fija, Bridge, Vlans",
            };
            this.listSlides = [img1,img2,img3];
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  infoStyles = [
    {'background-color': '#e0e0e0c0', 'color': 'black'}, // Estilos para la imagen 1
    {'background-color': '#040624c0'}, // Estilos para la imagen 2
    {'background-color': '#e0e0e0c0', 'color': 'black'}, // Estilos para la imagen 3
  ];


}
