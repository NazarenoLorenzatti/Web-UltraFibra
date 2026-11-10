import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-header-grid',
  templateUrl: './header-grid.component.html',
  styleUrls: ['./header-grid.component.css']
})
export class HeaderGridComponent implements OnInit {

  public backgroundImg = '';

  private readonly sectionServices = inject(SectionService);

  
  @Output() scrollPlans = new EventEmitter<void>();

    onScrollToPlans(): void {
    this.scrollPlans.emit();
  }
  
  ngOnInit(): void {
    this.getSection();
  }

  private getSection(): void {
    this.sectionServices.getSection('header-home').subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo !== '00') {
          return;
        }

        this.backgroundImg =
          data?.sectionsWebResponse?.sectionsWeb?.[0]?.imgs?.[1]?.urlObs ?? '';
      },
      error: (error: any) => {
        console.error('Error loading channels hero', error);
      }
    });
  }


}
