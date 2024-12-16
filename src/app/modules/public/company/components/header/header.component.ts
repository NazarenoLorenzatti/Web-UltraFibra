import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      let scrollPosition = window.pageYOffset;
      let parallaxElements = document.querySelectorAll('.parallax-section');
      
      parallaxElements.forEach((element: Element) => { 
        let distanceFromTop = (element as HTMLElement).offsetTop; 
        let parallaxFactor = 0.5; 
        
        (element as HTMLElement).style.backgroundPositionY = (distanceFromTop - scrollPosition) * parallaxFactor + 'px'; // Necesario castear a HTMLElement
      });
    });
  }
}
