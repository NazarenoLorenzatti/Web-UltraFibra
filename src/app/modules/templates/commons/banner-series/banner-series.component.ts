import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-banner-series',
  templateUrl: './banner-series.component.html',
  styleUrls: ['./banner-series.component.css']
})
export class BannerSeriesComponent implements OnInit{
  public responsiveOptions!: any[];
  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){

     this.sectionServices.getSection('banner-series').subscribe({
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

  ngOnInit() {
       this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 2
        }
    ];
}
}
