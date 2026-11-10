import { Component, OnInit, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-banner-series',
  templateUrl: './banner-series.component.html',
  styleUrls: ['./banner-series.component.css']
})
export class BannerSeriesComponent implements OnInit {

  private sectionServices = inject(SectionService);
  public section: any;

  ngOnInit(): void {
    this.getSection();
  }

  private getSection(): void {
    this.sectionServices.getSection('banner-series').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo === '00') {
          this.section = data?.sectionsWebResponse?.sectionsWeb?.[0];
        }
      },
      error: (error: any) => {
        console.error('Error loading banner-series section', error);
      }
    });
  }
}
