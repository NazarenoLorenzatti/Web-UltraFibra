import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';


@Component({
  selector: 'app-carrousel-home',
  templateUrl: './carrousel-home.component.html',
  styleUrls: ['./carrousel-home.component.css']
})
export class CarrouselHomeComponent {
  
  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){

     this.sectionServices.getSection('user-area-banners').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

  }
}
