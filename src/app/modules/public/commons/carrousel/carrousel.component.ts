import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';
import { SectionService } from 'src/app/modules/services/sections/section.service';

export interface slides {
  route: string;
  title: string;
  info: string;
  btn: string;
  url: string;
}

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnDestroy, OnInit {
  public listSlides: slides[] = [];
  public section: any = [];
  private sectionServices = inject(SectionService);
  private subscription!: Subscription;
  private mediaQueryService = inject(MediaQueryService)
  public isSmallScreen: boolean = false;


  ngOnInit(): void {
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
        if (this.isSmallScreen) {
          this.getSectionResponsive();
        } else {
          this.getSection();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getSection() {
    this.listSlides = [];
    this.sectionServices.getSection('header-home').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0].imgs && data.sectionsWebResponse.sectionsWeb[0].texts) {
            this.listSlides.push(
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[0].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[0].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[3].text,
                btn: "Más información",
                url: "/app/products/homelike"
              },
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[1].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[1].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[4].text,
                btn: "Mas información",
                url: "/app/grid"
              },
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[2].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[2].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[5].text,
                btn: "Mas información",
                url: "/app/products/corpo"
              },
            )
          }
        }

      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  getSectionResponsive() {
    this.listSlides = [];
    this.sectionServices.getSection('header-home').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0].imgs && data.sectionsWebResponse.sectionsWeb[0].texts) {
            this.listSlides.push(
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[3].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[0].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[3].text,
                btn: "Más información",
                url: "/app/products/homelike"
              },
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[4].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[1].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[4].text,
                btn: "Mas información",
                url: "/app/grid"
              },
              {
                route: data.sectionsWebResponse.sectionsWeb[0].imgs[5].urlObs,
                title: data.sectionsWebResponse.sectionsWeb[0].texts[2].text,
                info: data.sectionsWebResponse.sectionsWeb[0].texts[5].text,
                btn: "Mas información",
                url: "/app/products/corpo"
              },
            )
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
}


