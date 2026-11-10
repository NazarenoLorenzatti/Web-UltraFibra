import { Component, OnInit, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-banner-cineplus',
  templateUrl: './banner-cineplus.component.html',
  styleUrls: ['./banner-cineplus.component.css']
})
export class BannerCineplusComponent implements OnInit {

  private sectionServices = inject(SectionService);
  public backgroundImageUrl = '';

  ngOnInit(): void {
    this.getSection();
  }

  private getSection(): void {
    this.sectionServices.getSection('banner-cineplus').subscribe({
      next: (data: any) => {
        const section = data?.sectionsWebResponse?.sectionsWeb?.[0];

        if (data?.metadata?.[0]?.codigo === '00' && section?.imgs?.length) {
          this.backgroundImageUrl = section.imgs[0]?.urlObs || '';
        }
      },
      error: (error: any) => {
        console.error('Error loading banner-cineplus section', error);
      }
    });
  }
}
