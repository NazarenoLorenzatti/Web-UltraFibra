import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';


export interface Slide {
  name: string;
  velocity: string;
  price: string;
}

export interface SlideGroup {
  city: string;
  slide: Slide[];
}

@Component({
  selector: 'app-promos-section',
  templateUrl: './promos-section.component.html',
  styleUrls: ['./promos-section.component.css']
})
export class PromosSectionComponent implements OnInit {

  public listSlides: SlideGroup[] = [];
  pantallaPequena: boolean = false;

  constructor(media: MediaMatcher) {
    this.listSlides.push(
      {
        city: "MONJE",
        slide: [
          {
            name: "COMBO MEGA",
            velocity: "25MB",
            price: "$16.000",
          },
          {
            name: "COMBO SUPER",
            velocity: "50MB",
            price: "$18.000",
          },
          {
            name: "COMBO ULTRA",
            velocity: "100MB",
            price: "$20.000",
          }
        ]
      },
      {
        city: "C BERMÚDEZ",
        slide: [
          {
            name: "COMBO MEGA",
            velocity: "50MB",
            price: "$16.000",
          },
          {
            name: "COMBO SUPER",
            velocity: "100MB",
            price: "$18.000",
          },
          {
            name: "COMBO ULTRA",
            velocity: "200MB",
            price: "$20.000",
          }
        ]
      }/*,
      {
        city: "ANDINO",
        slide: [
          {
            name: "COMBO MEGA",
            velocity: "25MB",
            price: "$16.000",
          },
          {
            name: "COMBO SUPER",
            velocity: "50MB",
            price: "$18.000",
          },
          {
            name: "COMBO ULTRA",
            velocity: "100MB",
            price: "$20.000",
          }
        ]
      }*/
    )
  }

  ngOnInit(): void {
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

}
