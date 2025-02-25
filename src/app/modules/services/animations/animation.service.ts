import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  setAnimation(className: string, animationClass: string, threshold: number = 0.2): void {
    const elements = document.querySelectorAll(`.${className}`);
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Agrega la clase de animación
            (entry.target as HTMLElement).classList.add(animationClass);

            // Deja de observar el elemento después de aplicar la animación
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
  }


}
