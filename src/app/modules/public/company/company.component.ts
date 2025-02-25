import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ParallaxService } from '../../services/parallax/parallax.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

   private parallaxService = inject(ParallaxService);

  ngOnInit(): void {
    this.parallaxService.setParallax('parallax-section', 0.1);
  }

  ngOnDestroy(): void {
    this.parallaxService.clearParallax(); 
  }
}