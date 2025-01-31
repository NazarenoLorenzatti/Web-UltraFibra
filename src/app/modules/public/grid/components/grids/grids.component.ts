import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';
import { SectionService } from 'src/app/modules/services/sections/section.service';

interface ImageItem {
  urlObs: string;
  description: string;
}
@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})
export class GridsComponent implements OnInit, OnDestroy {

  public showAll = false;
  public visibleCount = 0;
  public section: { imgs: ImageItem[] } = { imgs: [] };
  public isSmallScreen = false;
  private sectionServices = inject(SectionService);
  private subscription!: Subscription;
  private mediaQueryService = inject(MediaQueryService)

  constructor(){
  }

  ngOnInit(): void {
    this.getSection();
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
        this.visibleCount = this.isSmallScreen ? 6 : 20;
      }
    );
    this.visibleCount = this.isSmallScreen ? 6 : 20;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleShow() {
    this.showAll = !this.showAll;
    this.visibleCount = this.showAll ? this.section.imgs.length : 20;
  }

  getSection() {
    this.sectionServices.getSection('grids-imgs').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.section.imgs = data.sectionsWebResponse.sectionsWeb[0].imgs;
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
}



