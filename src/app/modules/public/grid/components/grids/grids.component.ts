import { MediaMatcher } from '@angular/cdk/layout';
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
  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(media: MediaMatcher){
    this.pantallaCelu = media.matchMedia('(max-width: 1130px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);
    
     this.sectionServices.getSection('grids-imgs').subscribe({
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

  showDialog(grid: string) {
    this.grid = grid;
    this.visible = true;
  }


  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
  }
}
