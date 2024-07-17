import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-banner-cineplus',
  templateUrl: './banner-cineplus.component.html',
  styleUrls: ['./banner-cineplus.component.css']
})
export class BannerCineplusComponent implements OnInit {
  private sectionServices = inject(SectionService)
  public section: any;
  public backgroundImageUrl!: string;
  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  
  constructor(media: MediaMatcher){    
    this.pantallaCelu = media.matchMedia('(max-width: 768px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);

     this.sectionServices.getSection('banner-cineplus').subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
          this.backgroundImageUrl = this.section.imgs[0].urlObs;      
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

  }
  ngOnInit(): void {
    this.detectarCambioPantalla();
    window.addEventListener('scroll', () => {
      let scrollPosition = window.pageYOffset;
      let parallaxElements = document.querySelectorAll('.parallax-section');
      
      parallaxElements.forEach((element: Element) => { // Cambio a Element aquí
        let distanceFromTop = (element as HTMLElement).offsetTop; // Necesario castear a HTMLElement
        let parallaxFactor = 0.5; // Ajusta el factor de paralax según tu preferencia
        
        (element as HTMLElement).style.backgroundPositionY = (distanceFromTop - scrollPosition) * parallaxFactor + 'px'; // Necesario castear a HTMLElement
      });
    });
  }

  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
    if(this.pantallaPequena){
      this.backgroundImageUrl = this.section.imgs[1].urlObs;
    } else {
      this.backgroundImageUrl = this.section.imgs[0].urlObs;
    }
  }

  ngOnDestroy() {
    this.pantallaCelu.removeEventListener('change', this.pantallaCeluListener);
  }
}