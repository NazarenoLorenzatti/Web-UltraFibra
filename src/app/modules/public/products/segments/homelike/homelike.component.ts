import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-homelike',
  templateUrl: './homelike.component.html',
  styleUrls: ['./homelike.component.css']
})
export class HomelikeComponent {

  private viewportScroller = inject(ViewportScroller);
  private sectionServices = inject(SectionService);

  public section: any;

  constructor() {
    this.sectionServices.getSection('products-homelike').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo === '00' && data?.sectionsWebResponse?.sectionsWeb?.[0]) {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
        }
      },
      error: (error: any) => {
        console.error('Error loading products-homelike section', error);
      }
    });

    this.viewportScroller.scrollToPosition([0, 0]);
  }


    scrollToPlans(): void {
    this.viewportScroller.scrollToAnchor('planes-hogar');
  }
}
