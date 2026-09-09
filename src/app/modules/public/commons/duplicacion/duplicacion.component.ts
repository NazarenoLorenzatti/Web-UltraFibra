import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duplicacion',
  templateUrl: './duplicacion.component.html',
  styleUrls: ['./duplicacion.component.css']
})
export class DuplicacionComponent implements AfterViewInit, OnDestroy {
  verMas() {
    throw new Error('Method not implemented.');
  }

  @ViewChild('promoSection', { static: true })
  promoSection!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private cycleTimeouts: number[] = [];
  private cycleInterval?: number;
  private router = inject(Router);

  navigate(url: string) {
    this.router.navigate([url]);
  }

  ngAfterViewInit(): void {
    this.initObserver();
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.observer?.disconnect();
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.startCycle();
          this.cycleInterval = window.setInterval(
            () => this.startCycle(),
            9000
          );
        } else {
          this.reset();
        }
      },
      { threshold: 0.4 }
    );

    this.observer.observe(this.promoSection.nativeElement);
  }

  private startCycle(): void {
    this.clearTimers();

    const section = this.promoSection.nativeElement;
    const hero = section.querySelector('.hero-container') as HTMLElement;
    const x2 = section.querySelector('.x2-container') as HTMLElement;

    if (!hero || !x2) return;

    section.classList.add('visible');

    // Hero entra
    hero.classList.remove('animate-out');
    hero.classList.add('animate-in');
    x2.classList.remove('focus');

    // Hero sale + X2 foco
    this.cycleTimeouts.push(
      window.setTimeout(() => {
        hero.classList.remove('animate-in');
        hero.classList.add('animate-out');
        x2.classList.add('focus');
      }, 3500)
    );

    // Hero vuelve + X2 normal
    this.cycleTimeouts.push(
      window.setTimeout(() => {
        hero.classList.remove('animate-out');
        hero.classList.add('animate-in');
        x2.classList.remove('focus');
      }, 6500)
    );
  }

  private reset(): void {
    this.clearTimers();
    clearInterval(this.cycleInterval);

    const section = this.promoSection.nativeElement;
    section.classList.remove('visible');

    section
      .querySelector('.hero-container')
      ?.classList.remove('animate-in', 'animate-out');

    section
      .querySelector('.x2-container')
      ?.classList.remove('focus');
  }

  private clearTimers(): void {
    this.cycleTimeouts.forEach(t => clearTimeout(t));
    this.cycleTimeouts = [];
  }
}