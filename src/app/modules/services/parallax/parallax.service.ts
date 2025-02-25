import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParallaxService {
  private observers: Map<Element, IntersectionObserver> = new Map();

  constructor() { }

  setParallax(parallaxClass: string = 'parallax-section', parallaxFactor: number = 0.1): void {
    const parallaxElements = document.querySelectorAll(`.${parallaxClass}`);

    parallaxElements.forEach((element: Element) => {
      if (!this.observers.has(element)) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Elemento visible en el viewport
                const scrollPosition = window.pageYOffset;
                const distanceFromTop = (element as HTMLElement).offsetTop;
                (element as HTMLElement).style.backgroundPositionY =
                  (distanceFromTop - scrollPosition) * parallaxFactor + 'px';
              }
            });
          },
          {
            root: null, // Viewport del navegador
            threshold: 0.2, // Detecta incluso si solo una parte del elemento está visible
          }
        );

        observer.observe(element);
        this.observers.set(element, observer);
      }
    });
  }

  clearParallax(): void {
    // Detener todos los observers y limpiar la referencia
    this.observers.forEach((observer, element) => {
      observer.unobserve(element);
    });
    this.observers.clear();
  }
}
