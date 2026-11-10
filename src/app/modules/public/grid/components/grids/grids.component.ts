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
  public searchTerm = '';
  public filteredChannels: ImageItem[] = [];

  private readonly sectionServices = inject(SectionService);
  private readonly mediaQueryService = inject(MediaQueryService);
  private subscription?: Subscription;

  ngOnInit(): void {
    this.getSection();

    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
        this.updateVisibleCount();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleShow(): void {
    this.showAll = !this.showAll;
    this.updateVisibleCount();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredChannels = !term
      ? [...this.section.imgs]
      : this.section.imgs.filter((img) =>
          (img.description ?? '').toLowerCase().includes(term)
        );

    this.showAll = false;
    this.updateVisibleCount();
  }

  channelNumber(description: string): string {
    return (description ?? '').substring(0, 5).trim();
  }

  channelName(description: string): string {
    return (description ?? '').substring(5).trim();
  }

  trackByUrl(_: number, item: ImageItem): string {
    return item.urlObs;
  }

  private updateVisibleCount(): void {
    if (this.showAll || this.searchTerm.trim()) {
      this.visibleCount = this.filteredChannels.length;
      return;
    }

    this.visibleCount = this.isSmallScreen ? 8 : 24;
  }

  private getSection(): void {
    this.sectionServices.getSection('grids-imgs').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo !== '00') {
          return;
        }

        this.section.imgs =
          data?.sectionsWebResponse?.sectionsWeb?.[0]?.imgs ?? [];

        this.filteredChannels = [...this.section.imgs];
        this.updateVisibleCount();
      },
      error: (error: any) => {
        console.error('Error loading channels grid', error);
      }
    });
  }
}
