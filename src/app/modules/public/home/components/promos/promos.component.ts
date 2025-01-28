import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

export interface Slide {
  name: string;
  velocity: string;
  price: string;
}

export interface SlideGroup {
  city: string;
  slides: Slide[]; 
}

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements  OnInit{
  
  public isSmallScreen!: boolean; 
  public slidesList: SlideGroup[] = []; 
 
  ngOnInit(): void {
    this.initializeSlides();
  }
  
  // Inicializa la lista de slides
  private initializeSlides(): void {
    this.slidesList = [
      {
        city: 'MONJE',
        slides: [
          { name: 'COMBO MEGA', velocity: '100MB', price: '$16.000' },
          { name: 'COMBO SUPER', velocity: '200MB', price: '$18.000' },
          { name: 'COMBO ULTRA', velocity: '300MB', price: '$20.000' },
        ],
      },
      {
        city: 'C. BERMÚDEZ',
        slides: [
          { name: 'COMBO MEGA', velocity: '100MB', price: '$16.000' },
          { name: 'COMBO SUPER', velocity: '200MB', price: '$18.000' },
          { name: 'COMBO ULTRA', velocity: '300MB', price: '$20.000' },
        ],
      },
    ];
  }

 
}
