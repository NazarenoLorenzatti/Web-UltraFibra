import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})
export class PymesComponent {
 
  private viewportScroller = inject(ViewportScroller);
  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){
     this.sectionServices.getSection('products-pymes').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
        } 
      }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
