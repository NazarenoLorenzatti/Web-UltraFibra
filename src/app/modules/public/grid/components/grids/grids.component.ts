import { Component, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})
export class GridsComponent {
  public grid: string = "analogica.png";
  visible: boolean = false;

  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){

     this.sectionServices.getSection('grids-imgs').subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

  }

  showDialog(grid: string) {
    this.grid = grid;
    this.visible = true;
  }

}
