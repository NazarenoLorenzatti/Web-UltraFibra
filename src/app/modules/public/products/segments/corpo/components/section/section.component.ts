import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/modules/services/animations/animation.service';
import { ParallaxService } from 'src/app/modules/services/parallax/parallax.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent  implements OnInit, OnDestroy{

  private parallaxService = inject(ParallaxService);
  private animationService = inject(AnimationService);
  
  ngOnInit(): void {
    this.parallaxService.setParallax('parallax-section', 0);
    this.animationService.setAnimation('tracking-element', 'tracking-in-expand-fwd', 0.5);
  }

  ngOnDestroy(): void {
    this.parallaxService.clearParallax(); 
  }

}
