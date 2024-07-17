import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor() { }

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