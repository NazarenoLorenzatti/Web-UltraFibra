import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  responsiveOptions: any[] | undefined;
  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){

     this.sectionServices.getSection('clients').subscribe({
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

  ngOnInit(): void {

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

}