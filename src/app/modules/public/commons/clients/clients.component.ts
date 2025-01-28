import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  private sectionServices = inject(SectionService);
  public section: any;

  ngOnInit(): void {
    this.getSection();
  }

  getSection() {
    this.sectionServices.getSection('clients').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.section = data.sectionsWebResponse.sectionsWeb[0];
            console.log(this.section)
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

}