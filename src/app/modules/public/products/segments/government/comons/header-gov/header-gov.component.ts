import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-header-gov',
  templateUrl: './header-gov.component.html',
  styleUrls: ['./header-gov.component.css']
})
export class HeaderGovComponent {

  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){
     this.sectionServices.getSection('products-government').subscribe({
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

  }

}
